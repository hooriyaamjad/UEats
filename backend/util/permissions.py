from rest_framework import permissions

class IsOwnerOrReadOnly(permissions.BasePermission):
    
    def has_object_permission(self, request, _view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        return obj.profile.user == request.user

class IsRestaurantEmployee(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if not request.user.is_authenticated:
            return False
        return obj.employees.filter(user=request.user).exists()