from django.shortcuts import render
from rest_framework import viewsets,mixins,views
from rest_framework.exceptions import NotAcceptable
from .serializers import EventSerializer
from .models import Event
from django.utils.timezone import now,timedelta


class EventListApiView(mixins.ListModelMixin, viewsets.GenericViewSet):
    serializer_class = EventSerializer

    def get_queryset(self):
        return Event.objects.all().filter()

class JoinEventApiView(views.APIView):
    """
    You not gonna believe it, the view is used to join the event.
    """


    # Waiting for Godot
    authentication_classes = [] 
    permission_classes = []

    def post(self, request,pk:int,format=None):
        user = self.request.user

        # return Response(usernames)