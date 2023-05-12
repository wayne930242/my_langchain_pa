from functools import lru_cache
from typing import Callable

from langchain.chains import ConversationChain
from langchain.chat_models import ChatOpenAI
from langchain import LLMChain
from langchain.memory import ConversationBufferMemory
from langchain.prompts.chat import (
    ChatPromptTemplate,
    SystemMessagePromptTemplate,
)

from helper.config import OPENAI_API_KEY

system_messages = {
    "gm": "你是一個角色扮演遊戲與說故事的專家顧問。你會為我提供遊戲的靈感。如果需要你描述場景，你會設計一些吸引人的人物和故事情節。提供引人入勝的故事和場景細節是你最重要的任務。如果你對題材、時代或主題有不確定的地方，你會先詢問我細節，才會提供你的回答。你必須使用繁體中文。",
}

system_message_prompt = SystemMessagePromptTemplate.from_template(system_messages["gm"])
chat_prompt = ChatPromptTemplate.from_messages([system_message_prompt])


def chain_dependency() -> Callable[[], ConversationChain]:
    @lru_cache(maxsize=1)
    def dependency() -> ConversationChain:
        return ConversationChain(
            llm=ChatOpenAI(
                api_key=OPENAI_API_KEY,
                temperature=0,
                streaming=True,
            ),
            # prompt=chat_prompt,
            verbose=True,
            # memory=ConversationBufferMemory(),
        )

    return dependency


conversation_chain = chain_dependency()
