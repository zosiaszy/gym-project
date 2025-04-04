from django.urls import path
from .models import * 
from .views import EventListApiView
from rest_framework.routers import SimpleRouter

router = SimpleRouter()
router.register("", EventListApiView, "event")
urlpatterns = router.urls