from rest_framework import serializers
from .models import Offer, Order

class OfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = Offer
        fields = ['id', 'name', 'description', 'price', 'duration_days']

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'user', 'offer', 'start_date', 'end_date']
        read_only_fields = ['user', 'start_date', 'end_date']