from django.db import models
from django.contrib.auth.models import User


class Group(models.Model):
    name = models.CharField(max_length=50)
    is_admin = models.BooleanField()
    is_buyer = models.BooleanField()
    is_seller = models.BooleanField()

    def __str__(self):
        return self.name


class UserGroup(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    group_id = models.ForeignKey(Group, on_delete=models.CASCADE)
