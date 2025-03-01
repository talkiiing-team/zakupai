from fastapi import APIRouter
from kubernetes.client.models import V1CronJobList

from app.database.kubernetes import client

SCHEDULERS_NAMESPACE = "zakupai-schedulers"

router = APIRouter()


@router.get("/")
async def get_all_schedulers():
    batchv1 = client.BatchV1Api()

    crons: V1CronJobList = batchv1.list_namespaced_cron_job(SCHEDULERS_NAMESPACE)

    return crons.items
