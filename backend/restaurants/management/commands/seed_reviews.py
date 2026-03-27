from decimal import Decimal

from django.core.management.base import BaseCommand

from profiles.models import Profile
from restaurants.models import Restaurant, Review


class Command(BaseCommand):
	help = "Seed the database with sample restaurant reviews"

	def handle(self, *args, **kwargs):
		profiles = list(Profile.objects.all())
		restaurants = list(Restaurant.objects.all())

		if not profiles:
			self.stdout.write(
				self.style.WARNING(
					"No profiles found. Run seed_profiles before seeding reviews."
				)
			)
			return

		if not restaurants:
			self.stdout.write(
				self.style.WARNING(
					"No restaurants found. Run seed_restaurants before seeding reviews."
				)
			)
			return

		Review.objects.all().delete()

		review_texts = [
			"Great food and quick service.",
			"Portions were generous and worth the price.",
			"Good option between classes.",
			"Friendly staff and clean space.",
			"Menu has solid variety for different diets.",
			"Decent taste but service could be faster.",
			"Fresh ingredients and nice presentation.",
			"A bit pricey, but quality was good.",
			"Would come back for the signature items.",
			"Consistent quality every visit.",
		]
		ratings = [
			Decimal("4.5"),
			Decimal("4.0"),
			Decimal("3.5"),
			Decimal("5.0"),
			Decimal("4.2"),
			Decimal("3.8"),
		]

		created_count = 0
		for i, restaurant in enumerate(restaurants):
			profile = profiles[i % len(profiles)]
			Review.objects.create(
				profile=profile,
				restaurant=restaurant,
				rating=ratings[i % len(ratings)],
				description=review_texts[i % len(review_texts)],
			)
			created_count += 1

		self.stdout.write(
			self.style.SUCCESS(f"Successfully seeded {created_count} reviews")
		)
