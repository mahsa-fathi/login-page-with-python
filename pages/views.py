from django.shortcuts import render


def home(request):
    return render(request, 'pages/home.html', {})


def account(request):
    return render(request, 'pages/account.html', {})


def signup(request):
    return render(request, 'pages/signup.html', {})
