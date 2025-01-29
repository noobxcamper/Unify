from msal import PublicClientApplication
from backend.settings import TENANT_ID, APP_ID, SCOPES
import json

app = PublicClientApplication(
    APP_ID,
    authority="https://login.microsoftonline.com/" + TENANT_ID
)

# accounts = app.get_accounts()
# if accounts:
#     for account in accounts:
#         print(account['username'])
    
#     result = app.acquire_token_silent(scopes, account=accounts[0])

def interactive_login():
    result = app.acquire_token_interactive(SCOPES)
    print(result['expires_in'])

    if "access_token" in result:
        return result["access_token"]
    else:
        print("Error occurred")
        print(result.get("error"))
        print(result.get("error_description"))