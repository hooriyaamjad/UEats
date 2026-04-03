from django.contrib.auth.models import User
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APITestCase


class MeEndpointTest(APITestCase):
    def setUp(self):
        self.me_url = reverse("me")
        self.signup_url = reverse("signup")
        self.password = "pass"

        signup_payload = {
            "username": "user",
            "email": "user@ucalgary.ca",
            "password": self.password,
            "first_name": "Test",
            "last_name": "User",
            "profile": {
                "is_student": True,
                "university": "UCalgary",
                "student_id": "12345",
                "preferences": {"halal": True},
            },
        }
        signup_response = self.client.post(
            self.signup_url, signup_payload, format="json"
        )
        self.assertEqual(signup_response.status_code, status.HTTP_201_CREATED)

        self.access_token = signup_response.data["tokens"]["access"]
        self.profile = User.objects.get(username="user").profile

    def test_me_requires_authentication(self):
        response = self.client.get(self.me_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_me_returns_profile(self):
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.access_token}")

        response = self.client.get(self.me_url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["first_name"], "Test")
        self.assertEqual(response.data["last_name"], "User")
        self.assertEqual(response.data["university"], "UCalgary")
        self.assertEqual(response.data["student_id"], "12345")
        self.assertEqual(response.data["preferences"], {"halal": True})

    def test_me_update_users_profile(self):
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.access_token}")

        payload = {
            "preferences": {"halal": True, "vegan": True},
            "student_id": "2003",
        }
        response = self.client.patch(self.me_url, payload, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.profile.refresh_from_db()
        self.assertEqual(self.profile.student_id, "2003")
        self.assertEqual(self.profile.preferences, {"halal": True, "vegan": True})
