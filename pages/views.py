from django.shortcuts import render, redirect
from django.contrib import messages
from .forms import UserSignUpForm


def home(request):
    return render(request, 'pages/home.html', {})


def account(request):
    return render(request, 'pages/account.html', {})


def signup(request):
    if request.method == 'POST':
        form = UserSignUpForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, f'Account successfully created! You can now login.')
            return redirect('home')
        else:
            message = ""
            for msg in form.error_messages.values():
                message += msg
            messages.error(request, message)
            return redirect('register')
    else:
        form = UserSignUpForm()
    return render(request, 'pages/signup.html', {'form': form})
