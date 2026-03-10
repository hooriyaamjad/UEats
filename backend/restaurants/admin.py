from django.contrib import admin
from .models import Restaurant, Recommendation, Review

# Register your models here.
admin.site.register(Restaurant)
admin.site.register(Recommendation)
admin.site.register(Review)