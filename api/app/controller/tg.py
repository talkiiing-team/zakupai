from fastapi import APIRouter, Request
from aiogram.types import Update

from app import bot

router = APIRouter()


@router.post("/tg/webhook")
async def tg_webhook(request: Request) -> None:
    update = Update.model_validate(await request.json(), context={"bot": bot.bot})
    await bot.dispatcher.feed_update(bot.bot, update)
