from .models import Event,EventDate
from rest_framework import serializers


class EventSerializer(serializers.ModelSerializer):
    """
    Serializer for Events, related objects are nested.
    This serializer should be used only for viewing
    """

    number_of_participants = serializers.IntegerField(source="users.count")

    class Meta:
        model = Event
        exclude = ["users"]
        depth = 1

    def save(self, **kwargs):
        raise NotImplementedError
    
    def update(self, instance, validated_data):
        raise NotImplementedError
    
class EventDateSerializer(serializers.ModelSerializer):
    """
     This serializer should be used only for viewing
    """

    event = EventSerializer()
    class Meta:
        model = EventDate
        fields = "id", "event", "start_time", "end_time", "room"
        depth = 1


    def save(self, **kwargs):
        raise NotImplementedError

    def update(self, instance, validated_data):
        raise NotImplementedError
    

