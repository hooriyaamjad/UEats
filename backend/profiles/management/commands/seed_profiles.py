from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from profiles.models import Profile
from restaurants.models import Restaurant

class Command(BaseCommand):
    help = "Seed the database with sample user profiles"

    def handle(self, *args, **kwargs):
        # Delete existing profiles and users
        Profile.objects.all().delete()
        User.objects.filter(username__in=['user123', 'jane_smith', 'mike_ross']).delete()


        restaurants = list(Restaurant.objects.all())

        if not restaurants:
            self.stdout.write(
				self.style.WARNING(
					"No restaurants found. Run seed_restaurants before seeding recommendations."
				)
			)
            return

        profiles_data = [
            {
                "username": "user123",
                "email": "john.doe@ucalgary.ca",
                "first_name": "John",
                "last_name": "Doe",
                "password": "SecurePass123!",
                "is_student": True,
                "university": "University of Calgary",
                "student_id": "30012345",
                "preferences": {
                    "dietary": ["vegetarian"],
                    "cuisines": ["asian", "italian"],
                    "price_range": "medium"
                },
                "favourites": ["Subway", "Canadian Pizza Unlimited"]
            },
            {
                "username": "jane_smith",
                "email": "jane.smith@ucalgary.ca",
                "first_name": "Jane",
                "last_name": "Smith",
                "password": "SecurePass456!",
                "is_student": True,
                "university": "University of Calgary",
                "student_id": "30054321",
                "preferences": {
                    "dietary": ["gluten-free"],
                    "cuisines": ["mexican", "american"],
                    "price_range": "budget"
                },
                "favourites": ["Canadian Pizza Unlimited"]
            },
            {
                "username": "mike_ross",
                "email": "mike.ross@example.com",
                "first_name": "Mike",
                "last_name": "Ross",
                "password": "SecurePass789!",
                "is_student": False,
                "university": "University of Alberta",
                "student_id": None,
                "preferences": {
                    "dietary": [],
                    "cuisines": ["all"],
                    "price_range": "premium"
                },
                "favourites": ["Canadian Pizza Unlimited"]
            }
        ]

        for data in profiles_data:
            user = User.objects.create_user(
                username=data['username'],
                email=data['email'],
                first_name=data['first_name'],
                last_name=data['last_name'],
                password=data['password']
            )
            
            favourites = data.pop('favourites', [])
            
            profile = Profile.objects.create(
                user=user,
                is_student=data['is_student'],
                university=data['university'],
                student_id=data.get('student_id'),
                preferences=data.get('preferences')
            )
            
            if favourites:
                restaurants = Restaurant.objects.filter(name__in=favourites)
                profile.favourites.set(restaurants)

        self.stdout.write(self.style.SUCCESS('Successfully seeded profiles'))