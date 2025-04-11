from .models import Event,EventDate
from rest_framework import serializers

class EventDateSerializer(serializers.ModelSerializer):
    """
     This serializer should be used only for viewing
    """
    weekday = serializers.CharField(source="get_weekday_display")
    class Meta:
        model = EventDate
        fields = "weekday", "start_time", "end_time", "room"


    def save(self, **kwargs):
        raise NotImplementedError

    def update(self, instance, validated_data):
        raise NotImplementedError
    


class EventSerializer(serializers.ModelSerializer):
    """
    Serializer for Events, related objects are nested.
    This serializer should be used only for viewing
    """

    dates = EventDateSerializer(many=True)
    number_of_participants = serializers.IntegerField(source="users.count")

    class Meta:
        model = Event
        exclude = ["users"]
        depth = 2

    def save(self, **kwargs):
        raise NotImplementedError
    
    def update(self, instance, validated_data):
        raise NotImplementedError