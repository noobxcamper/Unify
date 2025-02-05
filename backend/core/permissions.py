from rest_framework.permissions import BasePermission

class RBAC(BasePermission):
    required_roles = ["Admin", "User"]

    def has_permission(self, request, view):
        if not request.user or request.user.is_anonymous:
            return False
        
        # Check for roles in the decoded token dictionary
        user_roles = request.user.get("roles", [])
        if any(role in self.required_roles for role in user_roles):
            return True
        return False