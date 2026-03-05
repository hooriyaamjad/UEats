from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    """
    Stores additional user information and each profile is linked to a single user.
    """
    
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    is_student = models.BooleanField()
    university = models.CharField()
    student_id = models.CharField(blank=True, null=True)

    class Meta:
        unique_together = ('student_id', 'university')