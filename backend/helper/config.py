from pathlib import Path
import os
from dotenv import load_dotenv

root_path = Path(__file__).resolve().parent.parent.parent

env_filt_name = ".env.local"
ENV_PATH = root_path / env_filt_name
load_dotenv(ENV_PATH)

API_URL = os.getenv("API_URL")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
PROMPTLAYER_API_KEY = os.getenv("PROMPTLAYER_API_KEY")
HUGGINGFACE_API_KEY = os.getenv("HUGGINGFACE_API_KEY")
DEBUG = os.getenv("DJANGO_DEBUG", False) == "True"
