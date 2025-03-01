from fastapi import APIRouter, Request
from aiogram.types import Update

from app.bot import dispatcher, bot

router = APIRouter()


@router.post("/webhook")
async def tg_webhook(request: Request) -> None:
    update = Update.model_validate(await request.json(), context={"bot": bot})
    await dispatcher.feed_update(bot, update)
