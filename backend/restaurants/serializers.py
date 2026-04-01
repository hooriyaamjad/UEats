
from rest_framework import serializers
from .models import Restaurant, Recommendation, Review


class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = '__all__'


class RecommendationSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Recommendation
        fields = '__all__'
        read_only_fields = ['profile', 'restaurant', 'like_count', 'dislike_count', 'created_at', 'updated_at']


class ReviewSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Review
        fields = '__all__'
        read_only_fields = ['profile', 'restaurant', 'created_at', 'updated_at']