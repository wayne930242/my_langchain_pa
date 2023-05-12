from fastapi import Depends, FastAPI, Request, WebSocket
from fastapi.templating import Jinja2Templates
from langchain.chains import ConversationChain
from pydantic import BaseModel

from langchain_fastapi.testing import mount_gradio_app
from langchain_fastapi.websockets import LLMChainWebsocketConnection

from .chains.conversation import conversation_chain

app = mount_gradio_app(FastAPI(title="ConversationChain"))
templates = Jinja2Templates(directory="template")


class QueryRequest(BaseModel):
    query: str


@app.get("/")
async def get(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.websocket("/chat")
async def websocket_endpoint(
    websocket: WebSocket, chain: ConversationChain = Depends(conversation_chain)
):
    connection = LLMChainWebsocketConnection.from_chain(
        chain=chain, websocket=websocket
    )
    await connection.connect()
