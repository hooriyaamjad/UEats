from decimal import Decimal

from django.contrib.auth.models import User
from django.core.management.base import BaseCommand

from profiles.models import Profile
from restaurants.models import Restaurant, Review


class Command(BaseCommand):
    help = "Seed the database with sample restaurant reviews"

    def handle(self, *args, **kwargs):
        restaurants = list(Restaurant.objects.all())

        if not restaurants:
            self.stdout.write(
                self.style.WARNING(
                    "No restaurants found. Run seed_restaurants before seeding reviews."
                )
            )
            return

        # Fetch the seeded profiles by username
        try:
            john = Profile.objects.get(user__username="user123")
            jane = Profile.objects.get(user__username="jane_smith")
            mike = Profile.objects.get(user__username="mike_ross")
        except Profile.DoesNotExist:
            self.stdout.write(
                self.style.WARNING(
                    "Seeded profiles not found. Run seed_profiles before seeding reviews."
                )
            )
            return

        Review.objects.all().delete()

        # (profile, rating, description)
        # John is vegetarian/budget-conscious, Jane is gluten-free, Mike has no dietary restrictions
        review_sets = [
            # Set A
            [
                (john, Decimal("4.0"), "Really solid veggie options here — the portions are generous and it fits my budget between classes. Will be back."),
                (jane, Decimal("3.5"), "Asked about gluten-free options and the staff were helpful, though the selection was a bit limited. Still enjoyable!"),
                (mike, Decimal("5.0"), "Honestly one of my go-to spots on campus. Everything I've tried has been great and the service is fast."),
            ],
            # Set B
            [
                (john, Decimal("4.5"), "One of the few places that actually does vegetarian well. Fresh ingredients and decent prices — hard to beat."),
                (jane, Decimal("4.0"), "Good food overall! I appreciated that they could accommodate my gluten-free needs without much fuss."),
                (mike, Decimal("4.2"), "Came here on a whim and was pleasantly surprised. Generous portions and the staff were friendly."),
            ],
            # Set C
            [
                (john, Decimal("3.5"), "Decent vegetarian choices but nothing that blew me away. Good enough for a quick lunch though."),
                (jane, Decimal("5.0"), "Best gluten-free experience I've had near campus! Clean space, great food, and the staff actually knew what they were talking about."),
                (mike, Decimal("3.8"), "Solid spot. Nothing fancy, but consistently good food at a fair price. I'd come back."),
            ],
            # Set D
            [
                (john, Decimal("4.2"), "Loved the variety — plenty of plant-based options and the prices are very student-friendly."),
                (mike, Decimal("4.5"), "Great atmosphere and quick service. Perfect when you only have 20 minutes between lectures."),
            ],
            # Set E
            [
                (jane, Decimal("3.8"), "Menu has improved since my last visit. Still wish there were more clearly labelled gluten-free items, but overall a good experience."),
                (mike, Decimal("4.0"), "Tasty food and nice presentation. A bit pricey for campus but worth it when you want something quality."),
            ],
        ]

        created_count = 0
        for i, restaurant in enumerate(restaurants):
            reviews = review_sets[i % len(review_sets)]
            for profile, rating, description in reviews:
                Review.objects.create(
                    profile=profile,
                    restaurant=restaurant,
                    rating=rating,
                    description=description,
                )
                created_count += 1

        self.stdout.write(
            self.style.SUCCESS(f"Successfully seeded {created_count} reviews")
        )
