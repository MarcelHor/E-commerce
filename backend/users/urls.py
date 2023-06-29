from django.urls import path
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from .views import RegisterViewSet, UserProfileView, TokenPairView

urlpatterns = [
    path('token/', TokenPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterViewSet.as_view({'post': 'create'})),
    path('profile/', UserProfileView.as_view(), name='user_profile'),
]
