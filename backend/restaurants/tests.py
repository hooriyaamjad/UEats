from copy import deepcopy

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from profiles.models import Profile
from .models import Restaurant, Review


class ReviewReplyTest(APITestCase):
	def setUp(self):
		self.signup_url = reverse('signup')
		self.restaurant = Restaurant.objects.create(
			name='Test Restaurant',
			description='Desc',
			location='Calgary',
			min_price=10,
			max_price=30,
			days_of_operation='MTWTF',
			opening_hours='09:00',
			closing_hours='17:00',
			rating=4.5,
		)

		self.base_signup_payload = {
			'username': 'base-user',
			'email': 'base@ucalgary.ca',
			'password': 'pass123',
			'first_name': 'Base',
			'last_name': 'User',
			'profile': {
				'is_student': True,
				'university': 'UCalgary',
				'student_id': '12345',
				'preferences': {'halal': True},
			},
		}

		self.reviewer = self._signup_user('reviewer', 'reviewer@ucalgary.ca')
		self.employee = self._signup_user(
			'employee',
			'employee@ucalgary.ca',
			works_for=self.restaurant.pk,
		)

		self.review = Review.objects.create(
			profile=self.reviewer,
			restaurant=self.restaurant,
			rating=4.0,
			description='Great food',
		)
		self.reply_url = f'/api/restaurants/{self.restaurant.pk}/reviews/{self.review.pk}/reply/'

	def _signup_user(self, username, email, works_for=None):
		payload = deepcopy(self.base_signup_payload)
		payload['username'] = username
		payload['email'] = email
		payload['profile']['student_id'] = f'{username}-id'
		if works_for:
			payload['profile']['works_for'] = works_for

		response = self.client.post(self.signup_url, payload, format='json')
		self.assertEqual(response.status_code, status.HTTP_201_CREATED)
		return Profile.objects.get(user__username=username)

	def test_reply_get_is_public(self):
		self.review.restaurant_reply = 'Thanks for your feedback.'
		self.review.save(update_fields=['restaurant_reply'])

		response = self.client.get(self.reply_url, format='json')

		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.assertEqual(response.data['reply'], 'Thanks for your feedback.')

	def test_reply_post_denied_for_non_employee(self):
		self.client.force_authenticate(user=self.reviewer.user)

		response = self.client.post(
			self.reply_url,
			{'reply': 'Reviewer should not be able to reply.'},
			format='json',
		)

		self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

	def test_reply_post_allowed_for_employee(self):
		self.client.force_authenticate(user=self.employee.user)

		response = self.client.post(
			self.reply_url,
			{'reply': 'Thanks, we will improve!'},
			format='json',
		)

		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.review.refresh_from_db()
		self.assertEqual(self.review.restaurant_reply, 'Thanks, we will improve!')

	def test_reply_put_updates_existing_reply_for_employee(self):
		self.review.restaurant_reply = 'Old reply'
		self.review.save(update_fields=['restaurant_reply'])
		self.client.force_authenticate(user=self.employee.user)

		response = self.client.put(
			self.reply_url,
			{'reply': 'Updated reply'},
			format='json',
		)

		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.review.refresh_from_db()
		self.assertEqual(self.review.restaurant_reply, 'Updated reply')

	def test_reply_post_denied_for_employee_of_different_restaurant(self):
		other_restaurant = Restaurant.objects.create(
			name='Other Restaurant',
			description='Other Desc',
			location='Toronto',
			min_price=15,
			max_price=35,
			days_of_operation='MTWTF',
			opening_hours='10:00',
			closing_hours='18:00',
			rating=4.0,
		)
		other_employee = self._signup_user(
			'other-employee',
			'other-employee@ucalgary.ca',
			works_for=other_restaurant.pk,
		)

		self.client.force_authenticate(user=other_employee.user)

		response = self.client.post(
			self.reply_url,
			{'reply': 'Should not be allowed'},
			format='json',
		)

		self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

	def test_reply_delete_clears_reply_for_employee(self):
		self.review.restaurant_reply = 'Temporary reply'
		self.review.save(update_fields=['restaurant_reply'])
		self.client.force_authenticate(user=self.employee.user)

		response = self.client.delete(self.reply_url, format='json')

		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.assertIsNone(response.data['reply'])
		self.review.refresh_from_db()
		self.assertIsNone(self.review.restaurant_reply)

	def test_reply_delete_denied_for_non_employee(self):
		self.review.restaurant_reply = 'Existing reply'
		self.review.save(update_fields=['restaurant_reply'])
		self.client.force_authenticate(user=self.reviewer.user)

		response = self.client.delete(self.reply_url, format='json')

		self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
		self.review.refresh_from_db()
		self.assertEqual(self.review.restaurant_reply, 'Existing reply')
