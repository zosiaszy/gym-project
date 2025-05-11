from django.test import TestCase
from django.utils import timezone
from rest_framework.test import APIRequestFactory, APITestCase
from rest_framework import reverse, status

from .views import EventDateListApiView
from .models import Event, EventType, Coach, Room, EventDate
from django.contrib.auth import get_user_model
from datetime import  timedelta
from django.utils import timezone
from .models import EventDate
from .forms import EventDateForm
from django.core.exceptions import ValidationError


# Uh oh spaghetti o's
# Looks like it's testing correctly, don't touch

class JoinEventApiViewTest(APITestCase):
    def setUp(self):
        event_type = EventType.objects.create(name="Powerlifting", description="Powerlifting event")
        self.room = Room.objects.create(number=101, name="Small Room")
        coach = Coach.objects.create(firstname="Janusz", lastname="Waligórski")
        self.user = get_user_model().objects.create_user(username="testuser", password="testpassword")
        
        self.event = Event.objects.create(
            event_type=event_type,
            coach=coach,
            person_limit=1,
        )
        self.url = reverse.reverse('join-event', kwargs={'pk': self.event.pk})

    def test_user_can_join_event_with_free_space(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.post(self.url)
        self.assertEqual(response.status_code, 200)
        self.assertIn(self.user, self.event.users.all())

    def test_user_cannot_join_full_event(self):
        self.client.force_authenticate(user=self.user)
        self.event.users.add(self.user)
        new_user = get_user_model().objects.create_user(username='anotheruser', password='password123')
        self.client.force_authenticate(user=new_user)
        response = self.client.post(self.url)

        self.assertEqual(response.status_code, 400)
        self.assertTrue("error" in response.json())

    def test_unauthenticated_user_cannot_join_event(self):
        response = self.client.post(self.url)
        self.assertEqual(response.status_code, 403)


class QuitEventApiViewTest(APITestCase):
    def setUp(self):
        event_type = EventType.objects.create(name="Powerlifting", description="Powerlifting event")
        self.room = Room.objects.create(number=101, name="Small Room")
        coach = Coach.objects.create(firstname="Janusz", lastname="Waligórski")
        self.user = get_user_model().objects.create_user(username="testuser", password="testpassword")
        
        self.event = Event.objects.create(
            event_type=event_type,
            coach=coach,
            person_limit=1,
        )
        
        self.url = reverse.reverse('quit-event', kwargs={'pk': self.event.pk})

    def test_user_can_quit_event_that_they_joined(self):
        self.event.users.add(self.user)
        self.client.force_authenticate(user=self.user)
        response = self.client.post(self.url)
        self.assertEqual(response.status_code, 200)
        self.assertFalse(self.event.users.all())

    def test_user_cannot_quit_if_they_never_joined_duh(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.post(self.url)
        self.assertEqual(response.status_code, 400)
        self.assertTrue("error" in response.json())

    def test_unauthenticated_user_cannot_quit_event(self):
        response = self.client.post(self.url)
        self.assertEqual(response.status_code, 403)


class EventDateModelTest(TestCase):
    def setUp(self):
        event_type = EventType.objects.create(name="Powerlifting", description="Powerlifting event")
        event_type.save()
        self.room = Room.objects.create(number=101, name="Small Room")
        self.room.save()
        coach = Coach.objects.create(firstname="Janusz", lastname="Waligórski")
        coach.save()
        self.user = get_user_model().objects.create_user(username="testuser", password="testpassword")
        
        self.event = Event.objects.create(
            event_type=event_type,
            coach=coach,
            person_limit=1,
        )
        
        self.event.save()

        self.now = timezone.now()
        self.hour = timezone.timedelta(hours=1)
        
        self.existing_event = EventDate.objects.create(
            event=self.event,
            room=self.room,
            start_time=self.now + self.hour,  
            end_time=self.now + 2*self.hour   
        )
        self.existing_event.save()

    def test_valid_event_date(self):
        event_date = EventDate(
            event=self.event,
            room=self.room,
            start_time=self.now + 3*self.hour, 
            end_time=self.now + 4*self.hour    
        )
        
        try:
            event_date.full_clean()  
        except ValidationError:
            self.fail("Should be valid")

    def test_start_time_inside_existing_event(self):
        event_date = EventDate(
            event=self.event,
            room=self.room,
            start_time=self.now + 1.5*self.hour,  
            end_time=self.now + 3*self.hour       
        )
        
        with self.assertRaises(ValidationError):
            event_date.full_clean()

    def test_end_time_inside_existing_event(self):
        event_date = EventDate(
            event=self.event,
            room=self.room,
            start_time=self.now,                  
            end_time=self.now + 1.5*self.hour     
        )
        
        with self.assertRaises(ValidationError):
            event_date.full_clean()

    def test_duplicate_event_times(self):
        event_date = EventDate(
            event=self.event,
            room=self.room,
            start_time=self.now + self.hour,  
            end_time=self.now + 2*self.hour   
        )
        
        with self.assertRaises(ValidationError):
            event_date.full_clean()

    def test_event_in_different_room(self):
        other_room = Room.objects.create(number=5,name="Other Room")
        other_room.save()
        event_date = EventDate(
            event=self.event,
            room=other_room,
            start_time=self.now + self.hour,     
            end_time=self.now + 2*self.hour      
        )
        
        try:
            event_date.full_clean()
        except ValidationError:
            self.fail("Another room so it shouldn't check")

    def test_edge_case_exact_start_time(self):
        event_date = EventDate(
            event=self.event,
            room=self.room,
            start_time=self.now + 2*self.hour, 
            end_time=self.now + 3*self.hour
        )
        
        try:
            event_date.full_clean()
        except ValidationError:
            self.fail("Dont check for eq, only greater/smaller")

    def test_edge_case_exact_end_time(self):
        event_date = EventDate(
            event=self.event,
            room=self.room,
            start_time=self.now,               
            end_time=self.now + self.hour      
        )

        try:
            event_date.full_clean()
        except ValidationError:
            self.fail("Dont check for eq, only greater/smaller")



class EventDateListApiViewTests(APITestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.url = reverse.reverse('event-list')
        
        self.coach = Coach.objects.create(
            firstname="Janusz", 
            lastname="Waligóra"
        )

        self.room = Room.objects.create(
            number=101,
            name="Small Powerlifting Room"
        )

        self.event_type = EventType.objects.create(
            name="type",
            description="type"
        )
        
        self.event1 = Event.objects.create(
            event_type=self.event_type,
            coach=self.coach,
            person_limit=10
        )
        self.event2 = Event.objects.create(
            event_type=self.event_type,
            coach=self.coach,
            person_limit=15
        )
        
        now = timezone.now()
        self.current_hour = now.replace(minute=0, second=0, microsecond=0)
        
        self.date1 = EventDate.objects.create(
            event=self.event1,
            room=self.room,
            start_time=self.current_hour,
            end_time=self.current_hour + timedelta(hours=1)
        )
        self.date2 = EventDate.objects.create(
            event=self.event2,
            room=self.room,
            start_time=self.current_hour + timedelta(days=1),
            end_time=self.current_hour + timedelta(days=1, hours=1)
        )

    def test_list_all_event_dates(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_filter_by_coach(self):
        response = self.client.get(self.url, {'coach': self.coach.pk})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
        response = self.client.get(self.url, {'coach': 999})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)

    def test_filter_by_date_range(self):
        from_date = (self.current_hour - timedelta(hours=1))
        to_date = (self.current_hour + timedelta(hours=2))
        
        response = self.client.get(self.url, {
            'from': from_date,
            'to': to_date
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_filter_by_event_type(self):
        response = self.client.get(self.url, {'event_type': self.event_type.pk})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
        other_type = EventType.objects.create(
            name="Seminar",
            description="Test seminar"
        )
        response = self.client.get(self.url, {'event_type': other_type.pk})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)

    def test_combined_filters(self):
        response = self.client.get(self.url, {
            'coach': self.coach.pk,
            'event_type': self.event_type.pk,
            'from': (self.current_hour - timedelta(hours=1)),
            'to': (self.current_hour + timedelta(hours=2))
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_empty_filters(self):
        response = self.client.get(self.url, {'coach': ''})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

class GenerateDatesAdminTests(TestCase):

    def setUp(self):
        get_user_model().objects.create_superuser(username="admin", password="password")
        self.client.login(username="admin", password="password")
        self.coach = Coach.objects.create(
            firstname="Janusz", 
            lastname="Waligóra"
        )

        self.room = Room.objects.create(
            number=101,
            name="Small Powerlifting Room"
        )

        self.event_type = EventType.objects.create(
            name="type",
            description="type"
        )
        
        self.event = Event.objects.create(
            event_type=self.event_type,
            coach=self.coach,
            person_limit=10
        )
        
        now = timezone.now()
        self.current_hour = now.replace(minute=0, second=0, microsecond=0)
        
        self.date = EventDate.objects.create(
            event=self.event,
            room=self.room,
            start_time=self.current_hour,
            end_time=self.current_hour + timedelta(hours=1)
        )

    def test_generate_more_dates(self):
        change_url = reverse.reverse("admin:events_eventdate_changelist")
        data = {
            "action": "generate_more_dates",
            "_selected_action": [self.date.pk],
            "how_many": "1",
        }
        response = self.client.post(change_url, data, follow=True)
        self.assertTrue(EventDate.objects.all().count() == 2)
    
    def test_generate_more_dates2(self):
        change_url = reverse.reverse("admin:events_eventdate_changelist")
        data = {
            "action": "generate_more_dates",
            "_selected_action": [self.date.pk],
            "how_many": "52",
        }
        response = self.client.post(change_url, data, follow=True)
        self.assertTrue(EventDate.objects.all().count() == 53)
