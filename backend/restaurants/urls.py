from django.urls import path
from rest_framework.routers import DefaultRouter
from rest_framework_nested.routers import NestedDefaultRouter

from .views import RestaurantViewSet, RecommendationViewset

router = DefaultRouter()
router.register(r'restaurants', RestaurantViewSet)
restaurants_router = NestedDefaultRouter(router, r'restaurants', lookup='restaurant')
restaurants_router.register(r'recommendations', RecommendationViewset, basename='restaurant-recommendations')

urlpatterns = [
    *router.urls,
    *restaurants_router.urls,
]  