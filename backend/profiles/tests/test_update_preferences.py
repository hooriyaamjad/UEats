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

    def test_update_preferences_success(self):
        self.client.force_authenticate(user=self.user)

        payload = {
            "preferences": {
                "dietary": ["vegetarian"],
                "allergens": ["peanuts"],
                "price_range": "30",
            }
        }

        response = self.client.put(self.url, payload, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.profile.refresh_from_db()
        self.assertEqual(self.profile.preferences, payload["preferences"])
        self.assertEqual(response.data["preferences"], payload["preferences"])

    def test_update_preferences_overwrite(self):
        self.client.force_authenticate(user=self.user)

        self.profile.preferences = {
            "dietary": ["halal"],
            "allergens": [],
            "price_range": "20",
        }
        self.profile.save()

        payload = {
            "preferences": {
                "dietary": ["vegan"],
                "allergens": ["milk"],
                "price_range": "40",
            }
        }

        response = self.client.put(self.url, payload, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.profile.refresh_from_db()
        self.assertEqual(self.profile.preferences, payload["preferences"])
        self.assertEqual(response.data["preferences"], payload["preferences"])