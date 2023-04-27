from pathlib import Path
import os
from dotenv import load_dotenv

ENV_PATH = Path(__file__).resolve().parent.parent.parent.parent / ".env.local"
load_dotenv(ENV_PATH)

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
DEBUG = os.getenv("DJANGO_DEBUG", False) == "True"
