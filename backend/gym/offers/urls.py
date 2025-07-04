from django.urls import path
from .views import OfferListAPIView, OfferSelectAPIView

urlpatterns = [
    path('', OfferListAPIView.as_view(), name='offer-list'),
    path('select/', OfferSelectAPIView.as_view(), name='offer-select'),
]