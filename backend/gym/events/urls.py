from django.urls import path
from .models import * 
from .views import EventListApiView, JoinEventApiView,QuitEventApiView
from rest_framework.routers import SimpleRouter

router = SimpleRouter()
router.register("", EventListApiView, "event")


urlpatterns = [
    path("join/<pk>", JoinEventApiView.as_view(), name="join-event"),
    path("quit/<pk>", QuitEventApiView.as_view(), name="quit-event")
   
]+router.urls