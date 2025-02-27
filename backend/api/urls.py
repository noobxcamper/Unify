from django.urls import path
from . import views

urlpatterns = [
    path('incidents/all', views.get_all_incidents),
    path('orders/all', views.get_all_orders),
    path('orders/<int:order_id>', views.OrdersAPI.as_view()),
    # path('orders/user/?email=<str:user_email>', views.get_all_user_orders),
    path('orders/user/', views.get_user_orders),
    path('files/download', views.get_download_url),
    path('files/upload', views.get_upload_url)
]