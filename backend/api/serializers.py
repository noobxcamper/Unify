from rest_framework import serializers
from django.contrib.auth.models import User
from core.models import Incident, Order

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {"password": {"write_only": True}}

class IncidentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Incident
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = (
            'id',
            'status',
            'responder',
            'submission_id',
            'submission_date',
            'department',
            'items',
            'price',
            'variation',
            'notes',
            'quantity',
            'ship_to',
            'shipping_address',
            'hyperlink',
            'tracking_url',
            'private_notes'
        )