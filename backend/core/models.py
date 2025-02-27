from django.db import models
from django.utils import timezone

# Create your models here.
class Incident(models.Model):
    # date = models.DateField(default=timezone.now().date)
    type = models.CharField(max_length=30, default='No type')
    name = models.CharField(max_length=100, default='No title')
    desc = models.CharField(max_length=10000, default='No description')
    analyst = models.CharField(max_length=100, default='Not assigned')
    reviewed_by = models.CharField(max_length=100, default='Not assigned')
    review_status = models.CharField(max_length=20, default='Not reviewed')

class Order(models.Model):
    # 0 = open, 1 = completed, 2 = in progress, 3 = closed
    submission_id = models.IntegerField(default=-1)
    submission_date = models.DateField(default=timezone.now().date())
    status = models.IntegerField(default=0)
    responder = models.CharField(max_length=100, default='No username')
    email = models.EmailField(max_length=100, default='No email')
    department = models.CharField(max_length=50, default='No department')
    items = models.CharField(max_length=50, default='No items')
    price = models.FloatField(default=0.0)
    variation = models.CharField(max_length=200, blank=True, default='No variation')
    notes = models.CharField(max_length=200, blank=True, default='No notes')
    quantity = models.IntegerField(default=0)
    ship_to = models.CharField(max_length=100, default='No shipping method')
    shipping_address = models.CharField(max_length=100, blank=True, default='No shipping address')
    hyperlink = models.CharField(max_length=500, default='No hyperlink')
    tracking_url = models.CharField(max_length=500, default='No tracking url')
    invoice_uploaded = models.BooleanField(default=False)
    private_notes = models.CharField(max_length=5000, blank=True)

class ExpensiveOrder(models.Model):
    submission_id = models.IntegerField(default=-1)
    purchase_order = models.CharField(max_length=300)
    invoice = models.CharField(max_length=300)