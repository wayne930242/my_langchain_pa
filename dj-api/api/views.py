# api/views.py
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes

from langchain.chat_models import ChatOpenAI
from langchain.schema import HumanMessage, SystemMessage

from .config.env import OPENAI_API_KEY
from .config.system_messages import SYSTEM_MESSAGES
from .helper.logger import mylogger


class GPTView(APIView):
    CHAT_BOT_TEMPERATURE = 0.7
    SYSTEM_MESSAGE_DEFAULT = "default"

    def post(self, request):
        try:
            question = request.data["question"]
            system_template = self.SYSTEM_MESSAGE_DEFAULT
        except KeyError as e:
            return Response(
                {"error": f"Missing key: {e}"}, status=status.HTTP_400_BAD_REQUEST
            )

        chat_bot = ChatOpenAI(
            temperature=self.CHAT_BOT_TEMPERATURE, openai_api_key=OPENAI_API_KEY
        )
        message_history = [
            SystemMessage(content=SYSTEM_MESSAGES[system_template]),
            HumanMessage(content=question),
        ]
        try:
            result = chat_bot(message_history)
            mylogger.info(result)
        except Exception as e:
            mylogger.error(e)
            return Response(
                {"error": f"Error generating response: {e}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
        response = result
        json_dict = {}
        for item in response:
            json_dict[item[0]] = item[1]
        return Response(json_dict)
