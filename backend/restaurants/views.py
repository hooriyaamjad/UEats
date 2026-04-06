from rest_framework import generics, status, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError

from .models import Restaurant, Recommendation, Review
from .serializers import RestaurantSerializer, RecommendationSerializer, ReviewSerializer
from util.permissions import IsOwnerOrReadOnly, IsRestaurantEmployee
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
        serializer.save(profile=self.request.user.profile, restaurant=Restaurant.objects.get(id=self.kwargs['restaurant_pk']))

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

        side = vote_type

        if profile in primary.all():
            primary.remove(profile) # unlike/undislike
            side = None
        else:
            # Do the like/dislike and remove the opposite
            primary.add(profile)
            opposite.remove(profile) 
        return Response({
            'like_count': recommendation.liked_by.count(),
            'dislike_count': recommendation.disliked_by.count(),
            'side': side
        })


class ReviewViewset(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer
    permission_classes = [IsOwnerOrReadOnly]

    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        if self.action == 'restaurant_reply':
            return [IsRestaurantEmployee()]
        if self.action == 'report':
            return [IsAuthenticated()]
        return [IsAuthenticated(), IsOwnerOrReadOnly()]
    
    def get_queryset(self):
        return (
            Review.objects
            .select_related('restaurant', 'profile')
            .filter(restaurant_id=self.kwargs['restaurant_pk'])
        )

    
    def perform_create(self, serializer: ReviewSerializer):
        serializer.save(profile=self.request.user.profile, restaurant=Restaurant.objects.get(id=self.kwargs['restaurant_pk']))
    
    @action(detail=True, methods=['post'], url_path='report')
    def report(self, request, **kwargs):
        review = self.get_object()
        reason = request.data.get('reason', '')
        review.is_reported = True
        review.report_reason = reason
        review.save(update_fields=['is_reported', 'report_reason'])
        return Response({'status': 'reported'}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['get', 'post', 'put', 'delete'], url_path='reply')
    def restaurant_reply(self, request, **kwargs):
        review = self.get_object()

        if request.method == 'GET':
            return Response({'reply': review.restaurant_reply})

        if request.method == 'DELETE':
            review.restaurant_reply = None
            review.save(update_fields=['restaurant_reply'])
            return Response({'reply': review.restaurant_reply})

        reply = request.data.get('reply')

        review.restaurant_reply = reply
        review.save(update_fields=['restaurant_reply'])

        return Response({'reply': review.restaurant_reply})


