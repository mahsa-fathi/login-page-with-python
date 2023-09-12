from django.urls import path
from . import views
from rest_framework.authtoken import views as auth_views

urlpatterns = [
    path("details/", views.UserDetailAPI.as_view(), name="user-detail"),
    path('register/', views.RegisterUserAPIView.as_view(), name='register-api'),
    path('api-token-auth/', auth_views.obtain_auth_token)
]
