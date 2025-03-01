from pydantic import Field, PostgresDsn, Secret
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    metabase_dsn: PostgresDsn = Field()
    tg_token: Secret[str] = Field()
    tg_webhook_url: str = Field()


settings = Settings()
