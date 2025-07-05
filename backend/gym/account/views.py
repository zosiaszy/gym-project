from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.request import Request
from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView, ListAPIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from .serializers import UserSerializer
from offers.models import Order
from offers.serializers import OrderSerializer
from events.serializers import EventSerializer 

class RegisterView(APIView):
    permission_classes = [AllowAny]
    def post(self, request) -> Response:
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()
            token = Token.objects.create(user=user)

            return Response({
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                },
                'token': token.key
            }, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserRetrieveView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class OrderHistoryAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request) -> Response:
        orders = Order.objects.filter(user=request.user).order_by('-start_date')
        return Response(OrderSerializer(orders, many=True).data)
    
class UserJoinedEventsListView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = EventSerializer
    
    def get_queryset(self):
        return self.request.user.events.all()
    