from django.urls import path
from . import views

urlpatterns = [
    path('incidents/all', views.get_all_incidents),
    path('orders', views.OrdersAPI.as_view()),
    path('orders/all', views.get_all_orders),
    path('orders/<int:order_id>', views.OrdersAPI.as_view()),
]