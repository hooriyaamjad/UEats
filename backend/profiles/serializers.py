from django.contrib.auth.models import User
from django.db import transaction

from rest_framework import serializers

from .models import Profile
from restaurants.models import Review


class MyReviewSerializer(serializers.ModelSerializer):
    restaurant_id = serializers.IntegerField(source='restaurant.id', read_only=True)
    restaurant_name = serializers.CharField(source='restaurant.name', read_only=True)
    restaurant_image_url = serializers.URLField(source='restaurant.image_url', read_only=True, allow_null=True)

    class Meta:
        model = Review
        fields = ['id', 'rating', 'description', 'tags', 'created_at', 'restaurant_id', 'restaurant_name', 'restaurant_image_url']


class ProfileSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source="user.first_name")
    last_name = serializers.CharField(source="user.last_name")
    email = serializers.EmailField(source="user.email", read_only=True)
    password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = Profile
        fields = ["id", "first_name", "last_name", "email", "password", "is_student", "university", "student_id", "image_url", "preferences", "works_for"]

    def update(self, instance, validated_data):
        user_data = validated_data.pop("user", {})

        user = instance.user

        if "first_name" in user_data:
            user.first_name = user_data["first_name"]

        if "last_name" in user_data:
            user.last_name = user_data["last_name"]

        password = validated_data.pop("password", None)

        if password:
            user.set_password(password)

        #TODO: add more editable fields here

        user.save()

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        return instance
    
class SignupProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ["is_student", "university", "student_id", "image_url", "preferences", "works_for"]

class SignupSerializer(serializers.ModelSerializer):
    profile = SignupProfileSerializer()

    class Meta:
        model = User
        fields = ["username", "email", "password", "profile", "first_name", "last_name"]
        extra_kwargs = {"password": {"write_only": True}}

    @transaction.atomic
    def create(self, validated_data):
        profile_data = validated_data.pop("profile")
        user = User.objects.create_user(**validated_data)
        Profile.objects.create(user=user, **profile_data)

        return user
