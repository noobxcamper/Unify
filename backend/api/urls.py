from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

urlpatterns = [
    path('user/token', TokenObtainPairView.as_view()),
    path('user/token/refresh', TokenRefreshView.as_view()),
    path('incidents/all', views.get_all_incidents),
    path('orders', views.OrdersAPI.as_view()),
    path('orders/all', views.get_all_orders),
    path('orders/<int:order_id>', views.OrdersAPI.as_view())
]