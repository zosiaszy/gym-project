from django.urls import path
from .models import * 
from .views import EventDateListApiView, JoinEventApiView,QuitEventApiView
from rest_framework.routers import SimpleRouter
from django.contrib import admin

router = SimpleRouter()
router.register("", EventDateListApiView, "event")


urlpatterns = [
    path("join/<pk>", JoinEventApiView.as_view(), name="join-event"),
    path("quit/<pk>", QuitEventApiView.as_view(), name="quit-event")
   
]+router.urls