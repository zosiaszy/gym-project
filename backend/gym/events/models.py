from django.db import models
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _
from django.core.exceptions import ValidationError


class Room(models.Model):
    number = models.IntegerField(_("Room number"), primary_key=True)
    name = models.CharField(_("Verbose room name"), max_length=128, 
                            help_text="For ex. 'small powerlifting room")
    def __str__(self) -> str:
        return f"{self.number} : {self.name}"

class Coach(models.Model):
    firstname = models.CharField(_("Firstname "), max_length=50)
    lastname = models.CharField(_("Lastname"), max_length=50)

    def __str__(self) -> str:
        return f"Coach {self.firstname} {self.lastname}"
    
    class Meta:
        verbose_name_plural = "Coaches"


class EventType(models.Model):
    name = models.CharField(_("Event type name"), max_length=128)
    description = models.TextField(_("Event description"))

    def __str__(self) -> str:
        return self.name
    
    class Meta:
        verbose_name_plural = "Event Types"

class Event(models.Model):
    event_type = models.ForeignKey(EventType, verbose_name=_("Event type"), on_delete=models.SET_NULL, null=True)
    users = models.ManyToManyField(get_user_model(), verbose_name=_("Participants"), related_name="events")
    coach = models.ForeignKey(Coach, on_delete=models.SET_NULL, 
                              null=True, related_name="events")
    person_limit = models.IntegerField(_("Person limit"))


    def __str__(self) -> str:
        return f"{self.event_type.name}, {self.coach}"
    
    def has_free_space(self):
        return self.users.count() < self.person_limit

    class Meta:
        verbose_name_plural = "Events"

class EventDate(models.Model):
    event = models.ForeignKey(Event, verbose_name=_("Event"), on_delete=models.SET_NULL, related_name="dates", null=True)
    start_time = models.DateTimeField(_("Start time"))
    end_time = models.DateTimeField(_("End time"))
    room = models.ForeignKey(Room, on_delete=models.SET_NULL, 
                             null=True, related_name="events")

    def __str__(self) -> str:
                return f'{self.event.event_type} {self.start_time.strftime("%Y %b %d %H:%M")} - {self.end_time.strftime("%Y %b %d %H:%M")}'
    
    def clean(self):
        super().clean() 
        new_start_time:str = self.start_time
        new_end_time  :str = self.end_time
        room_id  :str = self.room.number

        # check if new_start_time is inside another eventdate timeframe
        starts_inside = EventDate.objects.filter(
            start_time__lt=new_start_time, 
            end_time__gt=new_start_time,
            room_id=room_id
        )
        # check if new_end_time is inside another eventdate timeframe
        ends_inside = EventDate.objects.filter(
            start_time__lt=new_end_time, 
            end_time__gt=new_end_time,
            room_id=room_id
        )
        is_duplicate = EventDate.objects.filter(
            start_time=new_start_time, 
            end_time=new_end_time,
            room_id=room_id 
        )

        if starts_inside or ends_inside or is_duplicate:
            raise ValidationError(f"This date is overlapping with another date \
            {starts_inside, ends_inside, is_duplicate})")
        
        return            

    class Meta:
        verbose_name_plural = "Event Dates"
