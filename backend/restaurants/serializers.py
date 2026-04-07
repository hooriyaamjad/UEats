
from rest_framework import serializers
from .models import Restaurant, Recommendation, Review
from profiles.models import Profile


class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = '__all__'


class ReviewProfileSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source='user.first_name', read_only=True)
    last_name = serializers.CharField(source='user.last_name', read_only=True)

    class Meta:
        model = Profile
        fields = ['id', 'first_name', 'last_name', 'is_student', 'image_url']


class ReviewSerializer(serializers.ModelSerializer):
    profile_data = ReviewProfileSerializer(source='profile', read_only=True)

    class Meta:
        model = Review
        fields = '__all__'
        read_only_fields = ['profile', 'restaurant', 'created_at', 'updated_at']

class RecommendationSerializer(serializers.ModelSerializer):
    profile_data = ReviewProfileSerializer(source='profile', read_only=True)
    current_user_vote = serializers.SerializerMethodField()

    def get_current_user_vote(self, obj):
        request = self.context.get('request')
        user = getattr(request, 'user', None)

        if not user or not user.is_authenticated:
            return None

        try:
            profile = user.profile
        except Profile.DoesNotExist:
            return None

        profile_id = profile.id
        if any(p.id == profile_id for p in obj.liked_by.all()):
            return 'like'
        if any(p.id == profile_id for p in obj.disliked_by.all()):
            return 'dislike'
        return None

    class Meta:
        model = Recommendation
        fields = '__all__'
        read_only_fields = ['profile', 'created_at', 'updated_at', 'restaurant']