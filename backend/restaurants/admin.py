from django.contrib import admin
from unfold.admin import ModelAdmin

from .models import Restaurant, Recommendation, Review

# Register your models here.
admin.site.register(Restaurant, ModelAdmin)
admin.site.register(Recommendation, ModelAdmin)
admin.site.register(Review, ModelAdmin)