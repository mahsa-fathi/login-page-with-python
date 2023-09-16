# login-page-with-python

[![Python 3.9](https://img.shields.io/badge/Python-3.9-green.svg)](https://shields.io/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-6082B6)](https://shields.io/)
[![Django](https://img.shields.io/badge/Django-4.2-355E3B)](https://shields.io/)

This is a practice project to learn to work with Django and authentication in Django. This project contains a login page, a register page, and a simple profile page with account information.

## How it works

This project starts with creating a mysql database. Next, we start a django project called loginpage. 
We connect this project to the MySQL database. Then we create two apps for this django project, pages and database.
Pages contain the frontend of the website, and api contains the backend of the website.

### Databases

In order to connect django project to our MySQL database we have to change the settings database from sqlite to our own database.
This can be done with the following configurations.

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'django',  # db name
        'USER': 'root',
        'PASSWORD': 'pass',
        'HOST': 'localhost',
        'PORT': '6603'
    },
}
```

In this project, we only work with users. And for this purpose we use tables generated from Django.
We can migrate Django tables into our database using the following commands.

```shell
python manage.py makemigrations
python manage.py migrate --database=default
```

## Pages

We start our frontend with the following command.

```shell
python manage.py startapp pages
```

In loginpage/settings.py we add our app to the list of INSTALLED_APPS.

```python
INSTALLED_APPS = [
    ...
    'pages.apps.PagesConfig',
    ...
]
```
Next, we add static url to this file for Django to know where to look for static files.

```python
STATIC_URL = 'static/'
```

In loginpage/urls.py we add this url patterns for django. It redirects requests of different paths to the right view.

```python
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('pages.urls')),
    path('api/', include('api.urls')),
]
```
Finally, pages/views.py renders the right html file from templates to show the user login, register and account pages.
APIs are called using javascript in our html files.

## APIs

We start our api with the following command.

```shell
python manage.py startapp api
```

In loginpage/settings.py we add our app to the list of INSTALLED_APPS. We also add django rest_framework.

```python
INSTALLED_APPS = [
    ...
    'api.apps.ApiConfig',
    'rest_framework',
    'rest_framework.authtoken',
    ...
]
```
Now we need to do another migration due to adding authtoken.

```shell
python manage.py makemigrations
python manage.py migrate --database=default
```

We start api app by adding serializers.py to api package. There are two serializer classes:
1. UserSerializer: when calling user detail api, fields from this class are returned
2. RegisterSerializer: when calling user registration api, fields from this class are required to be sent. Then validate function checks some tests, and create the user using create function.

Serializers are used in api/views.py. In views.py there are two class based views.
1. UserDetailAPI: this view is for getting user details. It has a get method that uses token from header to identify the user and return the UserSerializer fields.
2. RegisterUserAPIView: this view is for user registration. It inherits from CreateAPIView, and has a post method. It lets RegisterSerializer to validate and create a new user.

Finally, in api/urls.py we connect the paths to our api views.

## Project layout

The project contains 4 main directories. 
api contains django app files for our backend services.
Database directory contains a docker-compose that starts a MySQL database for our project.
loginpage is the main directory for our django project, and contains project files.
pages contain django app files for our frontend.

```text
├── database
│   └── docker-compose.yaml   <- MySQL docker compose
├── api
│   ├── serializers.py        <- converting complex data formats into python data types for user registration
│   ├── urls.py               <- connecting api urls to api views
│   ├── ...
│   └── views.py              <- class based api views for login and register
├── loginpage
│   ├── settings.py           <- storing configurations
│   ├── urls.py               <- connecting url paths to different app views
│   └── ...
├── pages
│   ├── static                <- directory for keeping css and javascript files
│   ├── templates/pages       <- directory for keeping html files
│   ├── urls.py               <- connecting pages urls to views
│   ├── ...
│   └── views.py              <- views for login, register, and account pages
└── manage.py                 <- Django runner
```

## Data Model

Users table data model is as follows.

| Name         | Type         | Optional |
|--------------|--------------|----------|
| id           | Bigint       | False    |
| password     | Varchar(128) | False    |
| last_login   | datetime(6)  | True     |
| is_superuser | tinyint(1)   | False    |
| username     | Varchar(150) | False    |
| first_name   | Varchar(150) | False    |
| last_name    | Varchar(150) | False    |
| email        | Varchar(254) | False    |
| is_staff     | tinyint(1)   | False    |
| is_active    | tinyint(1)   | False    |
| date_joined  | datetime(6)  | False    |

## Useful Resources

[Corey Schafer Django tutorial](https://www.youtube.com/playlist?list=PL-osiE80TeTtoQCKZ03TU5fNfx2UY6U4p)

[REST Framework Django Registration](https://www.codersarts.com/post/how-to-create-register-and-login-api-using-django-rest-framework-and-token-authentication)


## Author

[Mahsa Fathi](https://www.linkedin.com/in/mahsa-fathi-68216112b/)
