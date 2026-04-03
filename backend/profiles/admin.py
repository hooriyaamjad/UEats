from django.contrib import admin
from unfold.admin import ModelAdmin

from profiles.models import Profile

admin.site.register(Profile, ModelAdmin)