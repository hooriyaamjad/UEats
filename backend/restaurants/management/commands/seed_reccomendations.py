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
			"Chicken Bun + Spicy Beef Sub.",
			"I recommend the Chicken Yakisoba.",
			"Any vegetarian item is good here!",
			"Get the chicken bun and pizza bun and alternate bites between each.",
			"Anything thats deep fried is really good here.",
			"Get the Filet O' Fish with no cheese and extra tartar sauce.",
			"3 Piece Chicken Tender combo with gravy and fries.",
			"16 inch chicken delight.",
			"Chicken shawarma platter.",
		]

		created_count = 0
		for i, restaurant in enumerate(restaurants):
			profile = profiles[i % len(profiles)]
			Recommendation.objects.create(
				profile=profile,
				restaurant=restaurant,
				description=descriptions[i % len(descriptions)],
			)
			created_count += 1

		self.stdout.write(
			self.style.SUCCESS(
				f"Successfully seeded {created_count} recommendations"
			)
		)

