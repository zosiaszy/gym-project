from django.contrib import admin
from django.urls import path,include
from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from .views import RegisterView, UserRetrieveView



urlpatterns = [
    path("login", obtain_auth_token),
    path("register/", RegisterView.as_view()),
    path("", UserRetrieveView.as_view())
]
