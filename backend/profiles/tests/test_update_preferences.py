from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from profiles.models import Profile

class UpdatePreferencesTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser",
            email="test@example.com",
            password="password123",
        )

        self.profile = Profile.objects.create(
            user=self.user,
            is_student=True,
            university="UofC",
            student_id="123",
        )

        self.url = reverse("profile-update-preferences")