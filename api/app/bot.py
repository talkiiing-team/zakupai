from aiogram import Bot, Dispatcher, Router
from aiogram.filters import CommandStart
from aiogram.types import Message
from aiogram.client.default import DefaultBotProperties
from aiogram.enums import ParseMode
from sqlalchemy import select

from app.database.metabase import async_session_maker
from app.models.notification_channel import NotificationChannel
from app.settings import settings

bot = Bot(
    token=settings.tg_token.get_secret_value(),
    default=DefaultBotProperties(parse_mode=ParseMode.MARKDOWN_V2),
)

dispatcher = Dispatcher()

router = Router()


@router.message(CommandStart())
async def on_start(message: Message) -> None:
    chat_id = message.chat.id
    user_id = message.chat.username

    async with async_session_maker() as metabase:
        result = await metabase.execute(
            select(NotificationChannel).where(NotificationChannel.tg_id == user_id)
        )

        existing_channel = result.first()

        if existing_channel is not None:
            return

        new_channel = NotificationChannel(tg_id=user_id, tg_chat_id=chat_id)
        metabase.add(new_channel)
        await metabase.commit()


dispatcher.include_router(router)
