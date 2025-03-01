from typing import Annotated, List
from uuid import uuid4

from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel, Field
from kubernetes.client.models import (
    V1CronJobList,
    V1CronJob,
    V1CronJobSpec,
    V1JobTemplateSpec,
    V1JobSpec,
    V1PodTemplateSpec,
    V1PodSpec,
    V1ObjectMeta,
    V1Container,
)

from app.models.notification_channel import NotificationChannel
from app.database.metabase import get_metabase_session
from app.database.kubernetes import client

SCHEDULERS_NAMESPACE = "zakupai-schedulers"

router = APIRouter()


@router.get("/")
async def get_all_schedulers():
    batchv1 = client.BatchV1Api()

    crons: V1CronJobList = batchv1.list_namespaced_cron_job(SCHEDULERS_NAMESPACE)

    schedulers = []
    for cron in crons.items:
        cron: V1CronJob
        schedulers.append(cron.to_dict())

    return schedulers


class CreateSchedulerBody(BaseModel):
    notification_channel_ids: List[int] = Field()
    target: str = Field()
    cron: str = Field()


@router.post("/")
async def create_scheduler(
    body: CreateSchedulerBody,
    metabase: Annotated[AsyncSession, Depends(get_metabase_session)],
):
    batchv1 = client.BatchV1Api()

    uid = str(uuid4())

    cmd = ["python3", "main.py", "--target", body.target]

    channels = await metabase.execute(
        select(NotificationChannel).filter(
            NotificationChannel.id.in_(body.notification_channel_ids)
        )
    )

    for channel in channels.scalars().all():
        if channel.tg_chat_id is not None:
            cmd.append("--telegram")
            cmd.append(str(channel.tg_chat_id))

        # TODO: email

    cronjob = V1CronJob(
        api_version="batch/v1",
        kind="CronJob",
        metadata=V1ObjectMeta(
            name=f"{uid}",
            namespace=SCHEDULERS_NAMESPACE,
            annotations={
                "zakupai.scheduler_uid": uid,
                "zakupai.notification_channel_id": ",".join(
                    list(map(str, body.notification_channel_ids))
                ),
            },
        ),
        spec=V1CronJobSpec(
            schedule=body.cron,
            job_template=V1JobTemplateSpec(
                spec=V1JobSpec(
                    template=V1PodTemplateSpec(
                        spec=V1PodSpec(
                            containers=[
                                V1Container(
                                    name="send-report",
                                    image="cr.yandex/crphumdkkpdrgg386glu/screenshooter:latest",
                                    image_pull_policy="Always",
                                    command=cmd,
                                ),
                            ],
                            restart_policy="Never",
                        ),
                    ),
                ),
            ),
        ),
    )

    print(cronjob)

    batchv1.create_namespaced_cron_job(SCHEDULERS_NAMESPACE, body=cronjob)


class DeleteSchedulerBody(BaseModel):
    uid: str = Field()


@router.delete("/")
async def delete_scheduler(body: DeleteSchedulerBody):
    batchv1 = client.BatchV1Api()

    batchv1.delete_namespaced_cron_job(body.uid, SCHEDULERS_NAMESPACE)
