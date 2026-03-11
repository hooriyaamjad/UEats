from django.urls import reverse
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APITestCase

class LoginIntegrationTest(APITestCase):

    def setUp(self):
        self.login_url = reverse('login')
        self.username = "user"
        self.password = "pass"
        self.user = User.objects.create_user(
            username=self.username, 
            password=self.password,
            email="user@ucalgary.ca"
        )

    def test_login_success_returns_tokens(self):
        payload = {
            "username": self.username,
            "password": self.password
        }

        response = self.client.post(self.login_url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)

    def test_login_fails_with_wrong_password(self):
        payload = {
            "username": self.username,
            "password": "WrongPassword789"
        }
        response = self.client.post(self.login_url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)