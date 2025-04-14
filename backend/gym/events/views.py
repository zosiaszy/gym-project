from django.db.models import QuerySet
from django.shortcuts import render
from rest_framework import viewsets,mixins,views, permissions
from rest_framework.response import Response
from .serializers import EventSerializer
from .models import Event
from django.shortcuts import get_object_or_404
from datetime import timedelta
from django.utils import timezone

class EventListApiView(mixins.ListModelMixin, viewsets.GenericViewSet):
    serializer_class = EventSerializer

    def apply_get_filter_params(self, qs:QuerySet):
        if cpk:=self.request.GET.get("coach", None):
            qs = qs.filter(
                coach__pk = cpk
            )
            qs.prefetch_related()

        if fr:=self.request.GET.get("from", None):
            qs = qs.filter(
                dates__start_time__gte = fr,
            )

        if to:=self.request.GET.get("to", None):
            qs = qs.filter(
                dates__start_time__lte = to
            )
        if evt:= self.request.GET.get("event_type", None):
            qs = qs.filter(
                event_type__pk = evt
            )
        return qs
                                        
    def get_queryset(self):
        qs = Event.objects.all()
        if self.request.GET:
            qs = self.apply_get_filter_params(qs)
        return qs


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
    
class QuitEventApiView(views.APIView):
    """
    View opens cd-rom, jk view is used to quit the event.
    """

    permission_classes = [permissions.IsAuthenticated]

    def post(self, request,pk:int,format=None):
        user = self.request.user
        ev : Event = get_object_or_404(Event, pk=pk)
        if ev.users.contains(user):
            ev.users.remove(user)
            return Response(data={}, status=200)
        return Response(data={"error":f"User is not attending this event"}, status=400)
    


