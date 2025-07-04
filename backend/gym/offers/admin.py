from django.contrib import admin
from .models import Offer, Order

@admin.register(Offer)
class OfferAdmin(admin.ModelAdmin):
    list_display = ("name", "price", "duration_days")

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ("user", "offer", "start_date", "end_date")