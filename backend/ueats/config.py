from __future__ import annotations

from typing import Optional
from pathlib import Path

from django.core.exceptions import ImproperlyConfigured
from pydantic_settings import BaseSettings


class AppConfig(BaseSettings):
    env: str = 'dev'
    postgres_db: Optional[str] = None
    postgres_user: Optional[str] = None
    postgres_password: Optional[str] = None
    postgres_host: Optional[str] = None
    postgres_port: Optional[int] = None
    debug: bool = True
    email_host_user: str = ""
    email_host_password: str = ""

def get_db_config(cfg: AppConfig, base_dir: Path) -> dict:
    """Get the db configs based on the app configs"""

    if cfg.env == 'prod':
        if not all([cfg.postgres_db, cfg.postgres_user, cfg.postgres_password, cfg.postgres_host, cfg.postgres_port]):
            raise ImproperlyConfigured("Missing Postgres environment variables for prod.")
        
        return {
            'default': {
                'ENGINE': 'django.db.backends.postgresql',
                'NAME': cfg.postgres_db,
                'USER': cfg.postgres_user,
                'PASSWORD': cfg.postgres_password,
                'HOST': cfg.postgres_host,
                'PORT': cfg.postgres_port,
            }
        }
    else:
        return {
            'default': {
                'ENGINE': 'django.db.backends.sqlite3',
                'NAME': base_dir / 'db.sqlite3',
            }
        }
    