from django.urls import reverse
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APITestCase

class SignupTest(APITestCase):
    
    def setUp(self):
        self.signup_url = reverse('signup')
        
        self.valid_payload = {
            "username": "user",
            "email": "user@ucalgary.ca",
            "password": "pass",
            "first_name": "person",
            "last_name": "james",
            "profile": {
                "is_student": True,
                "university": "UCalgary",
                "student_id": "12345",
                "preferences": {"halal": True}
            }
        }

    def test_signup_creates_user_and_profile(self):
        response = self.client.post(self.signup_url, self.valid_payload, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(User.objects.filter(username="user").exists())
        
        user = User.objects.get(username="user")
        self.assertEqual(user.profile.university, "UCalgary")
        self.assertEqual(user.first_name, "person")
        self.assertEqual(user.last_name, "james")

        self.assertIn('access', response.data['tokens'])
        self.assertIn('refresh', response.data['tokens'])

    def test_signup_fails_duplicate_id_same_uni(self):
        self.client.post(self.signup_url, self.valid_payload, format='json')

        payload = self.valid_payload.copy()
        payload['username'] = "new_user"
        response = self.client.post(self.signup_url, payload, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_signup_passed_duplicate_id_diff_uni(self):
        self.client.post(self.signup_url, self.valid_payload, format='json')

        payload = self.valid_payload.copy()
        payload['username'] = "new_user"
        payload['profile']['university'] = "UBC"
        response = self.client.post(self.signup_url, payload, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_signup_passed_duplicate_id_not_student(self):
        self.client.post(self.signup_url, self.valid_payload, format='json')

        payload = self.valid_payload.copy()
        payload['username'] = "new_user"
        payload['profile']['is_student'] = False
        response = self.client.post(self.signup_url, payload, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_signup_no_optional_fields(self):
        self.client.post(self.signup_url, self.valid_payload, format='json')

        payload = self.valid_payload.copy()
        payload['username'] = "new_user"
        del payload['profile']['student_id']
        del payload['profile']['preferences']
        response = self.client.post(self.signup_url, payload, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)