from django.db import models
from django.utils import timezone

# Create your models here.
class Incident(models.Model):
    date = models.DateField(default=timezone.now)
    type = models.CharField(max_length=30, default='No type')
    name = models.CharField(max_length=100, default='No title')
    desc = models.CharField(max_length=10000, default='No description')
    analyst = models.CharField(max_length=100, default='Not assigned')
    reviewed_by = models.CharField(max_length=100, default='Not assigned')
    review_status = models.CharField(max_length=20, default='Not reviewed')

class Order(models.Model):
    # 0 = open, 1 = completed, 2 = in progress, 3 = closed
    submission_id = models.CharField(max_length=100, default='')
    submission_date = models.DateField(default=timezone.now)
    status = models.IntegerField(default=0)
    responder = models.CharField(max_length=100, default='')
    email = models.EmailField(max_length=100, default='john@doe.com')
    department = models.CharField(max_length=50, default='')
    items = models.CharField(max_length=50, default='')
    price = models.FloatField(default=0.0)
    variation = models.CharField(max_length=200, default='No variation provided')
    notes = models.CharField(max_length=200, default='No notes provided')
    quantity = models.IntegerField(default=0)
    ship_to = models.CharField(max_length=100, default='')
    shipping_address = models.CharField(max_length=100, blank=True, default='No shipping address provided')
    hyperlink = models.CharField(max_length=500, default='')
    tracking_url = models.CharField(max_length=500, default='No tracking url provided')
    private_notes = models.CharField(max_length=5000, default='No private notes')