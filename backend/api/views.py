from backend.settings import AZURE_STORAGE_CONNECTION_KEY, AZURE_STORAGE_CONNECTION_STRING, AZURE_STORAGE_CONTAINER
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, AllowAny
from rest_framework_api_key.permissions import HasAPIKey
from azure.storage.blob import BlobServiceClient, generate_blob_sas, BlobSasPermissions
from azure.core.credentials import AccessToken
from core.permissions import RBAC
from core.models import Incident, Order
from .serializers import IncidentSerializer, OrderSerializer
from datetime import datetime, timedelta, timezone

# Create your views here.

#region Orders API
@api_view(['GET'])
@permission_classes([HasAPIKey | RBAC])
def get_all_orders(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)

    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([RBAC])
def get_all_user_orders(request):
    user_email = request.GET.get('user')
    orders = Order.objects.filter(email=user_email)
    serializer = OrderSerializer(orders, many=True)

    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([RBAC])
def get_user_orders(request):
    try:
        user_email = request.GET['email']
    except:
        return Response(status=400, data={'error_message': 'email field is required'})
    
    try:
        order_id = request.GET['id']
        orders = Order.objects.filter(submission_id=order_id, email=user_email)
    except:
        orders = Order.objects.filter(email=user_email)

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

#region Files API
@api_view(['GET'])
@permission_classes([RBAC])
def get_download_url(request):
    blob_service_client = BlobServiceClient.from_connection_string(AZURE_STORAGE_CONNECTION_STRING)
    blob_name = request.GET.get("filename")

    blob_client = blob_service_client.get_blob_client(container=AZURE_STORAGE_CONTAINER, blob=blob_name)

    # Generate a SAS token valid for 1 hour
    sas_token = generate_blob_sas(
        account_name=blob_service_client.account_name,
        account_key=AZURE_STORAGE_CONNECTION_KEY,
        container_name=AZURE_STORAGE_CONTAINER,
        blob_name=blob_name,
        permission=BlobSasPermissions(read=True),
        expiry=datetime.now(timezone.utc) + timedelta(hours=1),
    )

    print(datetime.now(timezone.utc) + timedelta(hours=1))

    download_url = f"{blob_service_client.url}{AZURE_STORAGE_CONTAINER}/{blob_name}?{sas_token}"
    return Response({"download_url": download_url})

@api_view(['GET'])
@permission_classes([RBAC])
def get_upload_url(request):
    blob_service_client = BlobServiceClient.from_connection_string(AZURE_STORAGE_CONNECTION_STRING)
    blob_name = request.GET.get("filename")

    blob_client = blob_service_client.get_blob_client(container=AZURE_STORAGE_CONTAINER, blob=blob_name)

    # Generate a SAS token valid for 1 hour
    sas_token = generate_blob_sas(
        account_name=blob_service_client.account_name,
        account_key=AZURE_STORAGE_CONNECTION_KEY,
        container_name=AZURE_STORAGE_CONTAINER,
        blob_name=blob_name,
        permission=BlobSasPermissions(write=True),
        expiry=datetime.now(timezone.utc) + timedelta(hours=1),
    )

    print(datetime.now(timezone.utc) + timedelta(hours=1))

    upload_url = f"{blob_service_client.url}{AZURE_STORAGE_CONTAINER}/{blob_name}?{sas_token}"
    return Response({"upload_url": upload_url})
#endregion