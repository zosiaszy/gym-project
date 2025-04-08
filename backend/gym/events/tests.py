from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import reverse, status
from .models import Event, EventType, Coach, Room, EventDate
from django.contrib.auth import get_user_model
from datetime import time
from .models import EventDate
from .forms import EventDateForm


class EventListApiViewTestCase(APITestCase):
    def setUp(self):
        event_type = EventType.objects.create(name="Powerlifting", description="Powerlifting event")
        room = Room.objects.create(number=101, name="Small Room")
        coach = Coach.objects.create(firstname="John", lastname="Doe")
        user = get_user_model().objects.create_user(username="testuser", password="testpassword")
        
        event = Event.objects.create(
            event_type=event_type,
            coach=coach,
            person_limit=20,
        )
        event.users.add(user)

        EventDate.objects.create(event=event, weekday="Mon", start_time="09:00:00", end_time="11:00:00", room=room)
        EventDate.objects.create(event=event, weekday="Wed", start_time="14:00:00", end_time="16:00:00", room=room)

    def test_event_list_view(self):
            url = reverse.reverse('event-list')
            response = self.client.get(url)
            self.assertEqual(response.status_code, status.HTTP_200_OK)
            self.assertIn("dates", response.data[0]) 
            self.assertIn("weekday", response.data[0]["dates"][0])
            self.assertIn("start_time", response.data[0]["dates"][0])
            self.assertIn("end_time", response.data[0]["dates"][0])


class EventDateFormTests(TestCase):
    def setUp(self):
        event_type = EventType.objects.create(name="Powerlifting", description="Powerlifting event")
        self.room = Room.objects.create(number=101, name="Small Room")
        coach = Coach.objects.create(firstname="John", lastname="Doe")
        user = get_user_model().objects.create_user(username="testuser", password="testpassword")
        
        self.event = Event.objects.create(
            event_type=event_type,
            coach=coach,
            person_limit=20,
        )

        self.existing_event = EventDate.objects.create(
            event = self.event,
            weekday='Mon',
            start_time=time(10, 0),
            end_time=time(12, 0),
            room=self.room
        )

    def test_duplicate_event(self):
        form = EventDateForm(data={
            'event' : self.event,
            'room' : self.room,
            'weekday': 'Mon',
            'start_time': time(10, 0),
            'end_time': time(12, 0),
        })
        self.assertFalse(form.is_valid())
        self.assertIn('This date is overlapping', str(form.errors))

    def test_overlapping_start_time(self):
        form = EventDateForm(data={
            'event' : self.event,
            'room' : self.room,
            'weekday': 'Mon',
            'start_time': time(11, 0),
            'end_time': time(13, 0),
        })
        self.assertFalse(form.is_valid())
        self.assertIn('This date is overlapping', str(form.errors))

    def test_overlapping_end_time(self):
        form = EventDateForm(data={
            'event' : self.event,
            'room' : self.room,
            'weekday': 'Mon',
            'start_time': time(9, 0),
            'end_time': time(11, 0),
        })
        self.assertFalse(form.is_valid())
        self.assertIn('This date is overlapping', str(form.errors))

    def test_non_overlapping_event(self):
        form = EventDateForm(data={
            'event' : self.event,
            'room' : self.room,
            'weekday': 'Mon',
            'start_time': time(20, 0),
            'end_time': time(21, 0),
        })
        self.assertTrue(form.is_valid())

