from django.shortcuts import render
from rest_framework import viewsets,mixins,views, permissions
from rest_framework.response import Response
from .serializers import EventSerializer
from .models import Event
from django.shortcuts import get_object_or_404

class EventListApiView(mixins.ListModelMixin, viewsets.GenericViewSet):
    serializer_class = EventSerializer

    def get_queryset(self):
        return Event.objects.all().filter()

class JoinEventApiView(views.APIView):
    """
    You not gonna believe it, the view is used to join the event.
    """

    permission_classes = [permissions.IsAuthenticated]

    def post(self, request,pk:int,format=None):
        user = self.request.user
        ev : Event = get_object_or_404(Event, pk=pk)
        if ev.has_free_space():
            ev.users.add(user)
        else:
            return Response(data={"error":f"Event is full"}, status=400)
        return Response(data={}, status=200)