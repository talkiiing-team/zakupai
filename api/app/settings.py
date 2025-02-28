from pydantic import Field, PostgresDsn
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    metabase_dsn: PostgresDsn = Field()


settings = Settings()
