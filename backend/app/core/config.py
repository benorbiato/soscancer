from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    PROJECT_NAME: str = "soscancer API"
    VERSION: str = "0.1.0"
    API_V1_PREFIX: str = "/api/v1"

    class Config:
        env_file = ".env"


settings = Settings()


