import jwt

from rest_framework.exceptions import AuthenticationFailed


def authenticated(user_type: str):
    """Auth decoratoIf the user got the correct COOKIE"""

    def inner(func):
        def wrapper(*args, **kwargs):
            token = args[1].COOKIES.get("jwt")
            if not token:
                raise AuthenticationFailed("Unauthentication")
            try:
                playload = jwt.decode(token, "secret", algorithms=["HS256"])
            except jwt.ExpiredSignatureError:
                raise AuthenticationFailed("Bad Authentication, token problem")
            if playload["user_type"] != user_type:
                raise AuthenticationFailed("Bad user for this request")
            else:
                kwargs["auth_id"] = playload["id"]
                return func(*args, **kwargs)

        return wrapper

    return inner
