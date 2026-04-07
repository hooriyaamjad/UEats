from rest_framework import permissions

from restaurants.models import Restaurant

class IsOwnerOrReadOnly(permissions.BasePermission):
    
    def has_object_permission(self, request, _view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        return obj.profile.user == request.user

class IsRestaurantEmployee(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if not request.user.is_authenticated:
            return False
        if isinstance(obj, Restaurant):
            return obj.employees.filter(user=request.user).exists()
        return obj.restaurant.employees.filter(user=request.user).exists()