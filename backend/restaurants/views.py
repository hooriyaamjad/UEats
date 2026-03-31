from rest_framework import generics, viewsets
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Restaurant, Recommendation
from .serializers import RestaurantSerializer, RecommendationSerializer
from util.permissions import IsOwnerOrReadOnly
from util.enums import VoteType

LIKE, DISLIKE = "like", "dislike"

class RestaurantListCreateView(generics.ListCreateAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            return [AllowAny()]   # TODO: Change to custom permission for restaurant owners. Currently allowing all for testing purposes.
        return [AllowAny()]


class RestaurantDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer

    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        return [AllowAny()]   # TODO: Change to custom permission for restaurant owners. Currently allowing all for testing purposes.
    

class ReccomendationViewset(viewsets.ModelViewSet):
    queryset = Recommendation.objects.select_related('restaurant', 'profile').all()
    serializer_class = RecommendationSerializer
    permission_classes = [IsOwnerOrReadOnly]

    def perform_create(self, serializer: RecommendationSerializer):
        serializer.save(profile=self.request.user.profile)

    @action(detail=True, methods=['post'], url_path='vote')
    def vote(self, request, _pk=None):
        recommendation = self.get_object()
        profile = request.user.profile
        vote_type = request.data.get('vote')

        if vote_type not in VoteType.values:
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