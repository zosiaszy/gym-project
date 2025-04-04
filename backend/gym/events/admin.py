from django.contrib import admin
from .models import *
from .forms import EventDateForm

class EventDateAdmin(admin.ModelAdmin):
    form = EventDateForm
        

admin.site.register(Room)
admin.site.register(Coach)
admin.site.register(EventType)
admin.site.register(Event)
admin.site.register(EventDate, EventDateAdmin)