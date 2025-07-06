from django.urls import path
from .views import EventDateListApiView, JoinEventApiView, QuitEventApiView
from rest_framework.routers import SimpleRouter

router = SimpleRouter()
router.register("", EventDateListApiView, "event")

urlpatterns = [
    path("join/<pk>", JoinEventApiView.as_view(), name="join-event"),
    path("quit/<pk>", QuitEventApiView.as_view(), name="quit-event"),
] + router.urls
