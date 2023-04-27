# api/urls.py
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import GPTView

urlpatterns = [
    path("chat/", GPTView.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
