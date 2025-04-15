import { AuthenticationResult, EventType, IdTokenClaims, PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "../settings/authConfig";

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
        "User.ReadBasic.All",
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
    // Get current token
    const currentToken = localStorage.getItem(API_ACCESS_TOKEN);

    await msalInstance.acquireTokenSilent(apiScopes)
        .then((response) => {
            const newToken = response.accessToken;

            if (currentToken !== newToken) {
                localStorage.setItem(API_ACCESS_TOKEN, response.accessToken);
            } else {
                console.log("[ID Token Rewnewal]: Tokens are the same, not updating local storage.");
            }
        })
        .catch(() => {
            msalInstance.acquireTokenPopup(apiScopes)
                .then((response) => {
                    const newToken = response.accessToken;

                    if (currentToken !== newToken) {
                        localStorage.setItem(API_ACCESS_TOKEN, response.accessToken);
                    } else {
                        console.log("[ID Token Rewnewal]: Tokens are the same, not updating local storage.");
                    }
                })
                .catch((error) => { console.error(error) });
        });
};

/**
 * Get the access token for the Graph API silently using the given scope.
 * If the token cannot be acquired silently, display an interactive sign in request.
 */
const getGraphTokenSilently = async () => {
    // Get current token
    const currentToken = localStorage.getItem(GRAPH_ACCESS_TOKEN);

    msalInstance.acquireTokenSilent(graphScopes)
        .then((response) => {
            const newToken = response.accessToken;

            if (currentToken !== newToken) {
                localStorage.setItem(GRAPH_ACCESS_TOKEN, response.accessToken);
            } else {
                console.log("[Graph Token Rewnewal]: Tokens are the same, not updating local storage.");
            }
        })
        .catch((error) => {
            console.error(error);

            msalInstance.acquireTokenPopup(graphScopes)
                .then((response) => {
                    const newToken = response.accessToken;

                    if (currentToken !== newToken) {
                        localStorage.setItem(GRAPH_ACCESS_TOKEN, response.accessToken);
                    } else {
                        console.log("[Graph Token Rewnewal]: Tokens are the same, not updating local storage.");
                    }
                })
                .catch((error) => { console.error(error) });
        });
};

const loginHandler = async () => {
    // Login and redirect using the api scopes
    msalInstance.loginRedirect(apiScopes)
        .catch(error => {
            console.error(error);
        })
}

// Logout handler for signing out, uses the current active account.
const logoutHandler = async () => {
    // Clear the tokens
    localStorage.removeItem(GRAPH_ACCESS_TOKEN);
    localStorage.removeItem(API_ACCESS_TOKEN);

    msalInstance.logoutRedirect({ account: msalInstance.getActiveAccount() })
        .then(() => {
            // Redirect to login page
            window.location.href = "/login";
        });
}

/**
 * Logs out the user by removing their access tokens, but not signing them out of Microsoft services entirely. Redirects to login page afterwards.
 */
const softLogout = () => {
    // Clear the tokens
    localStorage.removeItem(GRAPH_ACCESS_TOKEN);
    localStorage.removeItem(API_ACCESS_TOKEN);

    // Redirect to login page
    window.location.href = "/login";
}

/**
 * @param tokenClaim Microsoft token claim for the signed in user
 * @returns True if the user is admin, False if not
 */
const isAdmin = (tokenClaim: IdTokenClaims) => {
    let admin = false;

    tokenClaim.roles?.forEach((role) => {
        if ("Admin".includes(role)) {
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

        if (isAdmin(payload.idTokenClaims)) {
            getGraphTokenSilently();
        }
    }
});

export {
    msalInstance,
    isAdmin,
    loginHandler,
    logoutHandler,
    softLogout,
    getIdTokenSilently,
    getGraphTokenSilently,
    didTokenExpire
}
export const GRAPH_ACCESS_TOKEN = "graph_token";
export const API_ACCESS_TOKEN = "api_token";