from rest_framework import generics
from rest_framework.permissions import AllowAny

from .models import Restaurant
from .serializers import RestaurantSerializer


class RestaurantView(generics.ListAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer
    permission_classes = [AllowAny]