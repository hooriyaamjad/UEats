from django.db import models

class User(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    profile_picture_url = models.URLField(blank=True, null=True)
    verified_student = models.BooleanField(default=False)
    restaurant_owner = models.BooleanField(default=False)
    favourites = models.ManyToManyField(
        'Restaurant',
        blank=True,
        related_name='favorited_by'
    )
    preferences = models.JSONField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    
class Restaurant(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)    
    location = models.CharField(max_length=255)
    image_url = models.URLField(blank=True, null=True)
    min_price = models.DecimalField(max_digits=6, decimal_places=2)
    max_price = models.DecimalField(max_digits=6, decimal_places=2)
    hours_of_operation = models.CharField(max_length=255)
    rating = models.DecimalField(max_digits=1, decimal_places=2, default=0.0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    
class MenuItem(models.Model):
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name='menu_items')
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    image_url = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} - {self.restaurant.name}"
    
class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews')
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name='reviews')
    rating = models.DecimalField(max_digits=1, decimal_places=2)
    content = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Review by {self.user} for {self.restaurant}"
    
class Recommendation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='recommendations')
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name='recommendations')
    content = models.TextField(blank=True)
    like_count = models.IntegerField(default=0)
    dislike_count = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Recommendation by {self.user} for {self.restaurant}"
    
    class Meta:
        ordering = ['created_at']                # Default ordering
        verbose_name = "Recommendation"          # Singular name
        verbose_name_plural = "Recommendations"  # Plural name