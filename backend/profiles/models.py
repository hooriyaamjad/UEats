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
    image_url = models.URLField(max_length=1000,blank=True, null=True, default="")
    favourites = models.ManyToManyField(
        'restaurants.Restaurant',
        blank=True,
        related_name='favourited_by'
    )
    preferences = models.JSONField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['university', 'student_id'],
                condition=models.Q(is_student=True),
                name='unique_university_student_id_when_student'
            )
        ]