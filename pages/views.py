from django.shortcuts import render
from django.contrib.auth.decorators import login_required


def home(request):
    return render(request, 'pages/home.html', {})


@login_required(redirect_field_name='home')
def account(request):
    return render(request, 'pages/account.html', {})


def signup(request):
    return render(request, 'pages/signup.html', {})
