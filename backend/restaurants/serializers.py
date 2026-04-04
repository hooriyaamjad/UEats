
from rest_framework import serializers
from .models import Restaurant, Recommendation, Review
from profiles.models import Profile


class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = '__all__'


class RecommendationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Recommendation
        fields = '__all__'
        read_only_fields = ['profile', 'like_count', 'dislike_count', 'created_at', 'updated_at']


class ReviewProfileSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source='user.first_name', read_only=True)
    last_name = serializers.CharField(source='user.last_name', read_only=True)

    class Meta:
        model = Profile
        fields = ['id', 'first_name', 'last_name', 'is_student']


class ReviewSerializer(serializers.ModelSerializer):
    profile_data = ReviewProfileSerializer(source='profile', read_only=True)

    class Meta:
        model = Review
        fields = '__all__'
        read_only_fields = ['profile', 'restaurant', 'created_at', 'updated_at']