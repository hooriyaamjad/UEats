from django.urls import path
from rest_framework.routers import DefaultRouter
from rest_framework_nested.routers import NestedDefaultRouter

from .views import RestaurantViewSet, RecommendationViewset, ReviewViewset

router = DefaultRouter()
router.register(r'restaurants', RestaurantViewSet)

restaurants_router = NestedDefaultRouter(router, r'restaurants', lookup='restaurant')
restaurants_router.register(r'recommendations', RecommendationViewset, basename='restaurant-recommendations')
restaurants_router.register(r'reviews', ReviewViewset, basename='restaurant-reviews')

urlpatterns = [
    *router.urls,
    *restaurants_router.urls,
]  