from django.urls import path
from .views import RestaurantView

urlpatterns = [
    path('get-all/', RestaurantView.as_view(), name='get-all'),
]