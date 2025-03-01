import os
import argparse
import time

import nodriver
from aiogram import Bot
from aiogram.enums import ParseMode
from aiogram.client.default import DefaultBotProperties
from aiogram.types import FSInputFile


async def main():
    parser = argparse.ArgumentParser(
        prog="screenshooter",
    )

    parser.add_argument("--target", required=True)
    parser.add_argument("--email", action="append", default=[])
    parser.add_argument("--telegram", action="append", default=[])

    args = parser.parse_args()

    if os.getenv("TG_TOKEN") is None:
        print("No TG_TOKEN env provided!")
        quit(1)

    if len(args.email + args.telegram) < 1:
        print("No notification channels provided!")
        quit(1)

    bot = Bot(
        token=os.getenv("TG_TOKEN"),
        default=DefaultBotProperties(parse_mode=ParseMode.MARKDOWN_V2),
    )

    browser = await nodriver.start()

    print(f"Open {args.target}")
    page = await browser.get(args.target)

    time.sleep(10)

    screenshot = await page.save_screenshot()

    for user in args.telegram:
        await bot.send_photo(chat_id=user, photo=FSInputFile(screenshot))

    # TODO: email


if __name__ == "__main__":
    nodriver.loop().run_until_complete(main())
