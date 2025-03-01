from typing import Annotated, List, Literal, Union

from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field, EmailStr
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.metabase import get_metabase_session
from app.models.notification_channel import NotificationChannel

router = APIRouter()


class TelegramNotificationChannelSchema(BaseModel):
    type: Literal["telegram"] = "telegram"
    user_id: str = Field()


class EmailNotificationChannelSchema(BaseModel):
    type: Literal["email"] = "email"
    email: str = Field()


NotificationChannelSchema = Union[
    TelegramNotificationChannelSchema, EmailNotificationChannelSchema
]


@router.get("/")
async def get_notification_channels(
    metabase: Annotated[AsyncSession, Depends(get_metabase_session)]
) -> List[NotificationChannelSchema]:
    result = await metabase.execute(select(NotificationChannel))

    channels = []
    for res in result.scalars().all():
        if res.email is not None:
            channels.append(
                EmailNotificationChannelSchema(type="email", email=res.email)
            )

        if res.tg_id is not None:
            channels.append(
                TelegramNotificationChannelSchema(type="telegram", user_id=res.tg_id)
            )

    return channels


@router.post("/email")
async def get_notification_channels(
    email: EmailStr, metabase: Annotated[AsyncSession, Depends(get_metabase_session)]
):
    new_channel = NotificationChannel(email=str(email))
    metabase.add(new_channel)
    await metabase.commit()
