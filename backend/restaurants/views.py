from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAdminUser

from .models import Restaurant
from .serializers import RestaurantSerializer


class RestaurantListCreateView(generics.ListCreateAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            return [AllowAny()]   # TODO: Change to custom permission for restaurant owners. Currently allowing all for testing purposes.
        return [AllowAny()]


class RestaurantDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer

    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        return [AllowAny()]   # TODO: Change to custom permission for restaurant owners. Currently allowing all for testing purposes.