from django import forms
from .models import EventDate


class EventDateForm(forms.ModelForm):
    class Meta:
        fields = "__all__"
        model=EventDate

    def save(self, commit = ...):
        self.full_clean()
        return super().save(commit)