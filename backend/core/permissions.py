from rest_framework.permissions import BasePermission

class RoleBasedPermission(BasePermission):
    required_roles = ["Admin", "Employee"]

    def has_permission(self, request, view):
        # Ensure the user is authenticated (check if user is a dictionary)
        if not isinstance(request.user, dict):
            return False  # User is not authenticated

        # Check for roles in the decoded token dictionary
        user_roles = request.user.get("roles", [])
        if any(role in self.required_roles for role in user_roles):
            return True
        return False