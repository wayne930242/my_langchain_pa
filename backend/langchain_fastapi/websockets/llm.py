from typing import Any, Awaitable, Callable
import json

from fastapi import WebSocket
from langchain import LLMChain

from ..callbacks import AsyncLLMChainWebsocketCallback
from ..schemas import WebsocketResponse
from .base import BaseLangchainWebsocketConnection

from langchain.schema import AIMessage, HumanMessage, SystemMessage

from helper.logger import logger


class LLMChainWebsocketConnection(BaseLangchainWebsocketConnection):
    """BaseLangchainStreamingResponse class wrapper for LLMChain instances."""

    @staticmethod
    def _create_chain_executor(
        chain: LLMChain,
        websocket: WebSocket,
        response: WebsocketResponse,
    ) -> Callable[[], Awaitable[Any]]:
        async def wrapper(user_message: str):
            logger.info("Input from frontend: " + user_message)

            return await chain.acall(
                inputs=user_message,
                callbacks=[
                    AsyncLLMChainWebsocketCallback(
                        websocket=websocket, response=response
                    )
                ],
            )

        return wrapper
