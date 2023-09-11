from django.urls import path
from . import views

urlpatterns = [
    path("details/", views.UserDetailAPI.as_view(), name="user-detail"),
    path('register/', views.RegisterUserAPIView.as_view(), name='register-api')
]
