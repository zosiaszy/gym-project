from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from datetime import timedelta, date

from .models import Offer, Order
from .serializers import OfferSerializer, OrderSerializer

class OfferListAPIView(generics.ListAPIView):
    queryset = Offer.objects.all()
    serializer_class = OfferSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class OfferSelectAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        offer_id = request.data.get("offer_id")
        if not offer_id:
            return Response({"error": "offer_id is required."}, status=400)

        try:
            offer = Offer.objects.get(id=offer_id)
        except Offer.DoesNotExist:
            return Response({"error": "Offer not found."}, status=404)

        start = date.today()
        end = start + timedelta(days=offer.duration_days)

        order = Order.objects.create(
            user=request.user,
            offer=offer,
            start_date=start,
            end_date=end
        )
        return Response(OrderSerializer(order).data, status=201)