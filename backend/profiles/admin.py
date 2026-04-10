from django.contrib import admin
from unfold.admin import ModelAdmin

from profiles.models import Profile, EmployeeEmail

admin.site.register(Profile, ModelAdmin)
admin.site.register(EmployeeEmail, ModelAdmin)