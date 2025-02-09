from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import LoginView, RegisterUserView, RegisterCompanyView, GetRole

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('register/user/', RegisterUserView.as_view(), name='register_user'),
    path('register/company/', RegisterCompanyView.as_view(), name='register_company'),
    path('role/',GetRole.as_view(),name='Get'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]