from django.core.management.base import BaseCommand

from profiles.models import Profile
from restaurants.models import Recommendation, Restaurant


class Command(BaseCommand):
	help = "Seed the database with sample restaurant recommendations"

	def handle(self, *args, **kwargs):
		profiles = list(Profile.objects.all())
		restaurants = list(Restaurant.objects.all())

		if not profiles:
			self.stdout.write(
				self.style.WARNING(
					"No profiles found. Run seed_profiles before seeding recommendations."
				)
			)
			return

		if not restaurants:
			self.stdout.write(
				self.style.WARNING(
					"No restaurants found. Run seed_restaurants before seeding recommendations."
				)
			)
			return

		Recommendation.objects.all().delete()

		descriptions = [
			"Perfect for a quick bite before lecture.",
			"Best value-for-money meal on campus.",
			"Great vegetarian choices and fast prep.",
			"Ideal place for group lunch.",
			"Healthy options that still taste great.",
			"Reliable late-afternoon meal stop.",
			"Strong flavor and generous portions.",
			"Good atmosphere for casual hangouts.",
			"Consistently fresh and satisfying.",
			"Underrated spot worth trying.",
		]
		likes = [3, 5, 7, 9, 12, 4, 8, 6, 10, 2]
		dislikes = [0, 1, 2, 1, 0, 2, 1, 3, 1, 0]

		created_count = 0
		for i, restaurant in enumerate(restaurants):
			profile = profiles[(i + 1) % len(profiles)]
			Recommendation.objects.create(
				profile=profile,
				restaurant=restaurant,
				description=descriptions[i % len(descriptions)],
				like_count=likes[i % len(likes)],
				dislike_count=dislikes[i % len(dislikes)],
			)
			created_count += 1

		self.stdout.write(
			self.style.SUCCESS(
				f"Successfully seeded {created_count} recommendations"
			)
		)
