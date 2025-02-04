import { AuthenticationResult, EventType, IdTokenClaims, PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "../settings/authConfig";


/**
 * Roles here will have access to the Graph API. These roles here are used to determine whether the logged in user should get Graph API access upon refreshing the token.
 */
const adminRoles = [
    "Admin",
]

/** 
* Required scopes
* These scopes are for authentication with the backend API, they are DIFFERENT from Graph tokens!!
* DO NOT add any Graph scopes here, it will break :)
*/
const apiScopes = {
    scopes: [
        "api://884883ce-6358-4dc6-b166-178c78620a9a/default_access"
    ]
};

/**
 * Required scopes
 * These scopes are for Graph authentication!!
 */
const graphScopes = {
    scopes: [
        "User.Read",
        "User.ReadBasic.All"
    ]
};

// Microsoft Auth Settings
const msalInstance = new PublicClientApplication(msalConfig);

// Initialize MSAL
msalInstance.initialize();

/**
 * Checks if the token expired using its exp claim
 * @param exp the token expiry date and time in milliseconds
 * @returns true if expired and false if not
 */
const didTokenExpire = (exp?: number) => {
    if (Date.now() >= exp! * 1000) {
        return true;
    } else {
        return false
    }
};

/**
 * Get the ID Token for the application API silently using the given scope.
 * If the token cannot be acquired silently, display an interactive sign in request.
 * @param requestScope the scopes to be passed to the request
 */
const getIdTokenSilently = async () => {
    msalInstance.acquireTokenSilent(apiScopes)
        .then((response) => {
            localStorage.setItem(API_ACCESS_TOKEN, response.accessToken);
        })
        .catch(() => {
            msalInstance.acquireTokenPopup(apiScopes)
                .then((response) => {
                    localStorage.setItem(API_ACCESS_TOKEN, response.accessToken);
                })
                .catch((error) => { console.error(error) });
        });
};

/**
 * Get the access token for the Graph API silently using the given scope.
 * If the token cannot be acquired silently, display an interactive sign in request.
 */
const getGraphTokenSilently = async () => {
    msalInstance.acquireTokenSilent(graphScopes)
        .then((response) => {
            localStorage.setItem(GRAPH_ACCESS_TOKEN, response.accessToken);
        })
        .catch((error) => {
            console.error(error);

            msalInstance.acquireTokenPopup(graphScopes)
                .then((response) => {
                    localStorage.setItem(GRAPH_ACCESS_TOKEN, response.accessToken);
                })
                .catch((error) => { console.error(error) });
        });
};

// Get first active account on page load and redirect to homepage
if (!msalInstance.getActiveAccount() && msalInstance.getAllAccounts().length > 0) {
    msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
}

// Get the redirect parameter from the URL and redirect the user to that page.
// Can be overriden by setting its parameter to something else.
/**
 * Get the redirect parameter from the URL and redirect the user there.
 * @param fallbackUrl redirect to this URL in case the redirect parameter does not exist
 */
const loginSuccessRedirect = (fallbackUrl: string) => {
    // Get the redirect parameter
    const urlParams = new URLSearchParams(window.location.search);
    const redirectParam = urlParams.get("redirect");

    window.location.href = redirectParam ?? fallbackUrl;
}

const loginHandler = () => {
    // Login and redirect using the api scopes
    msalInstance.loginPopup(apiScopes)
        .catch(error => {
            console.error(error);
        })
}

// Logout handler for signing out, uses the current active account.
const logoutHandler = () => {
    msalInstance.logoutPopup({ account: msalInstance.getActiveAccount() }).then(() => {
        // Clear the tokens
        localStorage.removeItem(GRAPH_ACCESS_TOKEN);
        localStorage.removeItem(API_ACCESS_TOKEN);

        // Redirect to login page
        window.location.href = "/login";
    });
}

const isAdmin = (tokenClaim: IdTokenClaims) => {
    let admin = false;

    tokenClaim.roles?.forEach((role) => {
        if (adminRoles.includes(role)) {
            admin = true;
        } else {
            admin = false;
        }
    });

    return admin;
};

// Redirect to homepage on login success
msalInstance.addEventCallback((event) => {
    // Get the payload from the event
    const payload = event.payload as AuthenticationResult

    // If the event type is login success, and the payload has an account
    if (event.eventType === EventType.LOGIN_SUCCESS && payload.account) {
        // Set the active account to the payload account
        msalInstance.setActiveAccount(payload.account);

        // Get the access tokens with the given scope and set it in the application storage
        getIdTokenSilently();

        // Get the roles for the user and redirect appropriately
        // Additionally, if the user is Admin, get the graph api tokens
        if (isAdmin(payload.idTokenClaims)) {
            getGraphTokenSilently();

            setTimeout(() => {
                loginSuccessRedirect("/admin/dashboard");
            }, 300);
        } 
        else {
            loginSuccessRedirect("/");
        }
    }
});

export {
    msalInstance,
    isAdmin,
    loginHandler,
    logoutHandler,
    loginSuccessRedirect,
    getIdTokenSilently,
    getGraphTokenSilently,
    didTokenExpire
}
export const GRAPH_ACCESS_TOKEN = "graph_token";
export const API_ACCESS_TOKEN = "api_token";