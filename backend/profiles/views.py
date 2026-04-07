from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import generics, status, viewsets
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import action

from .serializers import SignupSerializer, ProfileSerializer, MyReviewSerializer
from .models import Profile
from restaurants.models import Review, Restaurant

class SignupView(generics.CreateAPIView):
    serializer_class = SignupSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        user = serializer.save()

        refresh = RefreshToken.for_user(user)

        return Response({
            "user": {
                "username": user.username,
                "email": user.email,
            },
            "tokens": {
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            },
            "message": "Signup successful!"
        }, status=status.HTTP_201_CREATED)


class ProfileViewSet(viewsets.ModelViewSet):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Profile.objects.filter(user=self.request.user)

    def create(self, request, *args, **kwargs):
        """
        Forbid creation of profiles as it should only be created through sign ups
        """
        return Response(status=status.HTTP_403_FORBIDDEN)
    
    def get_object(self):
        # Allows us to do a /me endpoint
        if self.kwargs.get("pk") == "me":
            return self.request.user.profile # type: ignore
        return super().get_object()

    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        data = request.data.copy()
        data.setdefault('is_student', instance.is_student)
        serializer = self.get_serializer(instance, data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    @action(detail=True, methods=["get"], url_path="reviews")
    def my_reviews(self, request, *args, **kwargs):
        profile = self.get_object()
        reviews = (
            Review.objects
            .select_related('restaurant')
            .filter(profile=profile)
        )
        serializer = MyReviewSerializer(reviews, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=["get"], url_path="favourites")
    def favourites(self, request, *args, **kwargs):
        profile = self.get_object()
        ids = list(profile.favourites.values_list('id', flat=True))
        return Response(ids)

    @action(detail=True, methods=["post"], url_path="favourites/toggle")
    def toggle_favourite(self, request, *args, **kwargs):
        profile = self.get_object()
        restaurant_id = request.data.get('restaurant_id')
        if not restaurant_id:
            return Response({'error': 'restaurant_id is required'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            restaurant = Restaurant.objects.get(id=restaurant_id)
        except Restaurant.DoesNotExist:
            return Response({'error': 'Restaurant not found'}, status=status.HTTP_404_NOT_FOUND)

        if profile.favourites.filter(id=restaurant_id).exists():
            profile.favourites.remove(restaurant)
            is_favourite = False
        else:
            profile.favourites.add(restaurant)
            is_favourite = True

        return Response({'is_favourite': is_favourite})

    @action(detail=False, methods=["put"], url_path="preferences")
    def update_preferences(self, request):
        profile = request.user.profile
        preferences = request.data.get("preferences")

        if preferences is None:
            return Response(
                {"error": "Preferences field is required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        profile.preferences = preferences
        profile.save()

        return Response(
            {"preferences": profile.preferences},
            status=status.HTTP_200_OK
        )