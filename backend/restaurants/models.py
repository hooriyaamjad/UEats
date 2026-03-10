from django.db import models

# Create your models here.
class Restaurant(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)    
    location = models.CharField(max_length=255)
    image_url = models.URLField(blank=True, null=True)
    menu_items = models.JSONField(default=list, blank=True)
    min_price = models.DecimalField(max_digits=6, decimal_places=2)
    max_price = models.DecimalField(max_digits=6, decimal_places=2)
    days_of_operation = models.CharField(max_length=255)
    opening_hours = models.CharField(max_length=255)
    closing_hours = models.CharField(max_length=255)
    rating = models.DecimalField(max_digits=2, decimal_places=1, default=0.0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    
class Review(models.Model):
    # user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews') //TODO: Define relationship with profile model
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name='reviews')
    rating = models.DecimalField(max_digits=2, decimal_places=1, default=0.0)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.description
    
    class Meta:
        ordering = ['-created_at']                # Default ordering
    

class Recommendation(models.Model):
    # user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='recommendations') //TODO: Define relationship with profile model
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name='recommendations')
    description = models.TextField(blank=True)
    like_count = models.IntegerField(default=0)
    dislike_count = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    def __str__(self):
        return self.description
    
    class Meta:
        ordering = ['-created_at']                # Default ordering
    
