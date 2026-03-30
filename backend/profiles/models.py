from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    """
    Stores additional user information and each profile is linked to a single user.
    """
    
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    is_student = models.BooleanField()
    university = models.CharField()
    student_id = models.CharField(blank=True, null=True)
    favourites = models.ManyToManyField(
        'restaurants.Restaurant',
        blank=True,
        related_name='favourited_by'
    )
    preferences = models.JSONField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('student_id', 'university')
        