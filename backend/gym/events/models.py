from django.db import models
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _


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
        dates = [str(i) for i in self.dates.all()]
        return f"{self.event_type.name} {dates}"
    
    def has_free_space(self):
        return self.users.count() < self.person_limit

    class Meta:
        verbose_name_plural = "Events"

class EventDate(models.Model):

    WEEKDAY = [ 
        ('Mon', 'Monday'),
        ('Tue', 'Tuesday'),
        ('Wed', 'Wednesday'),
        ('Thu', 'Thursday'),
        ('Fri', 'Friday'),
        ('Sat', 'Saturday'),
        ('Sun', 'Sunday'),
    ]
    
    event = models.ForeignKey(Event, verbose_name=_("Event"), on_delete=models.SET_NULL, related_name="dates", null=True)
    weekday = models.CharField(_("Week day"), max_length=3, choices=WEEKDAY)
    start_time = models.TimeField(_("Start time"))
    end_time = models.TimeField(_("End time"))
    room = models.ForeignKey(Room, on_delete=models.SET_NULL, 
                             null=True, related_name="events")

    def __str__(self) -> str:
        return f'{self.weekday}'

    class Meta:
        verbose_name_plural = "Event Dates"
