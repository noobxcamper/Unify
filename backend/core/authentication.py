from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth.models import User
from jwt.algorithms import RSAAlgorithm
import jwt
import requests

AZURE_TENANT_ID = "829c3abd-b89c-4d79-a1fb-6d8644f2fb53"
AZURE_CLIENT_ID = "884883ce-6358-4dc6-b166-178c78620a9a"  # API Application (client) ID
KEYS_URL = f"https://login.microsoftonline.com/{AZURE_TENANT_ID}/discovery/v2.0/keys"

class CustomUser:
    def __init__(self, user_data):
        self.user_data = user_data
        self.is_authenticated = True  # This makes it behave like a logged-in user
        self.roles = user_data.get("roles", [])  # Assuming roles are in the token

    def get(self, key, default=None):
        return self.user_data.get(key, default)

def verify_token(token):
    try:
        # Extract Key ID from token header
        unverified_header = jwt.get_unverified_header(token)
        kid = unverified_header.get("kid")
        if not kid:
            raise AuthenticationFailed("Token header is missing 'kid'")

        # Fetch Microsoft's public keys
        response = requests.get(KEYS_URL)
        response.raise_for_status()
        keys = response.json()["keys"]

        # Find the matching key by "kid"
        rsa_key = None
        for key in keys:
            if key["kid"] == kid:
                rsa_key = RSAAlgorithm.from_jwk(key)
                break

        if not rsa_key:
            raise AuthenticationFailed("No matching key found for token signature verification")

        # Decode & verify the token using the correct public key
        decoded_token = jwt.decode(
            token,
            rsa_key,
            algorithms=["RS256"],
            audience=AZURE_CLIENT_ID,  # Ensures token was issued for your API
            issuer=f"https://login.microsoftonline.com/{AZURE_TENANT_ID}/v2.0"
        )

        return decoded_token  # Token successfully verified

    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed("Token has expired")
    except jwt.InvalidTokenError as e:
        raise AuthenticationFailed(f"Invalid token: {str(e)}")

class AzureADAuthentication(BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            return None  # No authentication provided

        token = auth_header.split(" ")[1]

        try:
            decoded_token = jwt.decode(token, options={"verify_signature": False})
            print(f"Decoded token: {decoded_token}")
        except jwt.PyJWTError as e:
            raise AuthenticationFailed(f"Token decode error: {str(e)}")

        # Verify the token using your custom verification function
        decoded_token = verify_token(token)
        if not decoded_token:
            raise AuthenticationFailed("Invalid token")

        # Create a custom user object with decoded token
        request.user = CustomUser(decoded_token)

        return (request.user, None)  # Return the custom user object