from copy import deepcopy

from django.urls import reverse
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APITestCase

from restaurants.models import Restaurant

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

    def test_signup_employee(self):
        rest = Restaurant(name="rest", 
                          location="location", 
                          min_price = 0, 
                          max_price=1,
                          days_of_operation = "MWF",
                          opening_hours="1",
                          closing_hours="1",
                          rating=1,
                          )
        rest.save()

        payload = deepcopy(self.valid_payload)
        payload['profile']['works_for'] = rest.pk
        response = self.client.post(self.signup_url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        user = User.objects.get(username=payload["username"])
        self.assertEqual(user.profile.works_for_id, rest.pk)



