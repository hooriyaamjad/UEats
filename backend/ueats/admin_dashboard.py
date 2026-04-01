from django.contrib import admin
from django.utils.translation import gettext_lazy
from django.utils import timezone
from django.contrib.auth import get_user_model

from restaurants.models import Restaurant, Review, Recommendation

today = timezone.localdate()

def dashboard_callback(request, context):
    User = get_user_model()

    context.update({
        "kpi": [
            {
                "title": gettext_lazy("Total Users"),
                "metric": User.objects.count(),
                "icon": "person",
                "description": gettext_lazy("Registered accounts"),
            },
            {
                "title": gettext_lazy("New Users This Month"),
                "metric": User.objects.filter(
                    date_joined__year=today.year,
                    date_joined__month=today.month
                ).count(),
                "icon": "person_add",
                "description": gettext_lazy("Registered this month"),
            },
            {
                "title": gettext_lazy("Restaurants"),
                "metric": Restaurant.objects.count(),
                "icon": "restaurant",
                "description": gettext_lazy("Active listings"),
            },
            {
                "title": gettext_lazy("Reviews"),
                "metric": Review.objects.count(),
                "icon": "star",
                "description": gettext_lazy("Critiques given"),
            },
                        {
                "title": gettext_lazy("Recommendations"),
                "metric": Recommendation.objects.count(),
                "icon": "thumb_up",
                "description": gettext_lazy("Orders recommended"),
            },
        ],
    })

    return context