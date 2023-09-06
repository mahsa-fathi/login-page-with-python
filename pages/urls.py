from django.urls import path
from pages import views


urlpatterns = [
    path('', views.home, name="home"),
    path('account/', views.account, name='account'),
]
