from django import forms
from .models import EventDate
from django.utils.timezone import datetime
from datetime import time

# TODO 
# - check for overlapping event dates []

class EventDateForm(forms.ModelForm):
    class Meta:
        fields = "__all__"
        model=EventDate



        