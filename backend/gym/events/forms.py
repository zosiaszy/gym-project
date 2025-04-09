from django import forms
from .models import EventDate


class EventDateForm(forms.ModelForm):
    class Meta:
        fields = "__all__"
        model=EventDate


    def clean(self):
        """Check if the new date will not overlap with existing dates"""

        new_start_time:str = self.cleaned_data["start_time"]
        new_end_time  :str = self.cleaned_data["end_time"]
        other_dates = EventDate.objects.filter(weekday=self.cleaned_data["weekday"])
        for date in other_dates:
            starts_inside = date.start_time < new_start_time and date.end_time > new_start_time
            ends_inside = date.start_time < new_end_time and date.end_time > new_end_time
            is_duplicate = date.start_time == new_start_time and date.end_time == new_end_time
            if starts_inside or ends_inside or is_duplicate:
                raise forms.ValidationError(f"This date is overlapping with event(pk={date.pk})")
        return super().clean()



        