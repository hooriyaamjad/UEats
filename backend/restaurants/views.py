from rest_framework import generics, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError

from .models import Restaurant, Recommendation
from .serializers import RestaurantSerializer, RecommendationSerializer
from util.permissions import IsOwnerOrReadOnly
from util.enums import VoteType


class RestaurantViewSet(viewsets.ModelViewSet):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer
    permission_classes = [AllowAny]  # TODO: Change to custom permission for restaurant owners. Currently allowing all for testing purposes.
    

class RecommendationViewset(viewsets.ModelViewSet):
    serializer_class = RecommendationSerializer

    def get_permissions(self):
        if self.action == 'vote':
            return [IsAuthenticated()]
        return [IsOwnerOrReadOnly()]
    
    def get_queryset(self):
        return (
            Recommendation.objects
            .select_related('restaurant', 'profile')
            .prefetch_related('liked_by', 'disliked_by')
            .filter(restaurant_id=self.kwargs['restaurant_pk'])
        )

    
    def perform_create(self, serializer: RecommendationSerializer):
        serializer.save(profile=self.request.user.profile)

    @action(detail=True, methods=['post'], url_path='vote')
    def vote(self, request, **kwargs):
        recommendation = self.get_object()
        profile = request.user.profile
        vote_type = request.data.get('vote')

        if vote_type not in VoteType:
            return Response({'error': 'Invalid vote type'}, status=400)

        is_like = vote_type == VoteType.LIKE
        primary = recommendation.liked_by if is_like else recommendation.disliked_by
        opposite = recommendation.disliked_by if is_like else recommendation.liked_by

        if profile in primary.all():
            primary.remove(profile) # unlike/undislike
        else:
            # Do the like/dislike and remove the opposite
            primary.add(profile)
            opposite.remove(profile) 
        return Response({
            'like_count': recommendation.liked_by.count(),
            'dislike_count': recommendation.disliked_by.count(),
        })