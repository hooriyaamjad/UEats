from django.urls import include, path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import SignupView, ProfileViewSet, PasswordResetRequestView, PasswordResetConfirmView

router = DefaultRouter()
router.register(r'', ProfileViewSet, basename='profile')

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', TokenObtainPairView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("me/", ProfileViewSet.as_view({"get": "retrieve", "patch": "partial_update"}), {"pk": "me"}, name="me"),
    path("me/reviews/", ProfileViewSet.as_view({"get": "my_reviews"}), {"pk": "me"}, name="my-reviews"),
    path("me/favourites/", ProfileViewSet.as_view({"get": "favourites"}), {"pk": "me"}, name="my-favourites"),
    path("me/favourites/toggle/", ProfileViewSet.as_view({"post": "toggle_favourite"}), {"pk": "me"}, name="toggle-favourite"),
    path('', include(router.urls)),
    path('password-reset/', PasswordResetRequestView.as_view(), name='password-reset'),
    path('password-reset/confirm/', PasswordResetConfirmView.as_view(), name='password-reset-confirm'),
]