from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, AllowAny
from rest_framework_api_key.permissions import HasAPIKey
from core.permissions import RBAC
from core.models import Incident, Order
from .serializers import IncidentSerializer, OrderSerializer

# Create your views here.

#region Orders API
@api_view(['GET'])

# Allow requests with API keys, or authorized tokens
@permission_classes([HasAPIKey | RBAC])
def get_all_orders(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)

    return Response(serializer.data)

class OrdersAPI(APIView):
    permission_classes = [HasAPIKey | RBAC]

    def get(self, request, order_id):
        order = Order.objects.get(submission_id=order_id)
        serializer = OrderSerializer(order, data=request.data)

        if serializer.is_valid():
            return Response(serializer.data)
        else:
            print(serializer.errors)
    
    def post(self, request):
        serializer = OrderSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            print("Serializer Error: ", end="")
            print(serializer.errors)
    
    def patch(self, request, order_id):
        order = Order.objects.get(submission_id=order_id)
        serializer = OrderSerializer(order, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            print(serializer.errors)
    
    def delete(self, request, order_id):
        order = Order.objects.get(submission_id=order_id)
        order.delete()

        return Response(status=204)
#endregion

#region Incidents API
@api_view(['GET'])
def get_all_incidents(request):
    incidents = Incident.objects.all()
    serializer = IncidentSerializer(incidents, many=True)

    return Response(serializer.data)
#endregion