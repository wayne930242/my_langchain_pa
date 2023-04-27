from typing import Optional
from loguru import logger
from ..config.env import DEBUG


class MyLogger:
    def __init__(self):
        self.logger = logger if DEBUG else self.__NullLogger()

    def debug(self, message: str, *args, **kwargs):
        self.logger.debug(message, *args, **kwargs)

    def info(self, message: str, *args, **kwargs):
        self.logger.info(message, *args, **kwargs)

    def warning(self, message: str, *args, **kwargs):
        self.logger.warning(message, *args, **kwargs)

    def error(self, message: str, *args, **kwargs):
        self.logger.error(message, *args, **kwargs)

    def critical(self, message: str, *args, **kwargs):
        self.logger.critical(message, *args, **kwargs)

    class __NullLogger:
        def __init__(self):
            pass

        def debug(self, message: str, *args, **kwargs):
            pass

        def info(self, message: str, *args, **kwargs):
            pass

        def warning(self, message: str, *args, **kwargs):
            pass

        def error(self, message: str, *args, **kwargs):
            pass

        def critical(self, message: str, *args, **kwargs):
            pass


mylogger = MyLogger()
