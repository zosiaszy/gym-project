from django.utils.timezone import timedelta, datetime
from django.contrib import admin
from .models import *
from .forms import EventDateForm
from django_admin_action_forms import AdminActionFormsMixin, AdminActionForm, action_with_form, forms
from django.utils.translation import gettext as _



# (?) I don't have clue how to test this shit 

class GenerateMoreDates(AdminActionForm):
    how_many = forms.IntegerField(min_value=1, max_value=52, 
                                  help_text="Selected dates will be duplicated for n consecutive weeks")

@admin.register(EventDate)
class EventDateAdmin(AdminActionFormsMixin, admin.ModelAdmin):
    list_filter = ["start_time", "end_time", "event", "room"]
    form = EventDateForm

    errors:list[str] = []

    def __generate(self, obj:EventDate, n:int):
        starting_start_time = obj.start_time
        starting_end_time = obj.end_time

        for i in range(1,n+1):
            evd = EventDate(
                start_time = starting_start_time+timedelta(days=7*i),
                end_time = starting_end_time+timedelta(days=7*i),
                event = obj.event,
                room = obj.room
            )

            try:
                evd.full_clean()
            except ValidationError as e:
                self.errors.append(repr(e))
            else:
                evd.save()

    @action_with_form(GenerateMoreDates,description="generate more dates",)
    def generate_more_dates(self, request, queryset, data):
        for event in queryset:
            self.__generate(event, data["how_many"])
        if not self.errors:
            self.message_user(request, _(f'Good'))
        self.message_user(request, ", ".join(self.errors), level=40)
        
    actions = [generate_more_dates]


        

@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    model=Room

@admin.register(Coach)
class CoachAdmin(admin.ModelAdmin):
    list_filter = ["events"]
    model=Coach

@admin.register(EventType)
class EventType(admin.ModelAdmin):
    model=EventType

@admin.register(Event)
class Event(admin.ModelAdmin):
    list_filter = ["event_type", "coach"]
    model=Event




