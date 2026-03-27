from django.core.management import call_command
from django.core.management.base import BaseCommand

class Command(BaseCommand):
    help = "Runs all seeding scripts in the correct order"

    def handle(self, *args, **options):
        self.stdout.write(self.style.WARNING("Starting master seed process..."))

        self.stdout.write("Seeding Profiles...")
        call_command('seed_profiles')
        
        self.stdout.write("Seeding Restaurants...")
        call_command('seed_restaurants')

        self.stdout.write(self.style.SUCCESS("All data seeded successfully!"))