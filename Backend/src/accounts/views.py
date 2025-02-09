from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from .serializers import CompanyAccountSerializer, UserAccountSerializer
from .models import CompanyAccount, UserAccount

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        try:
            user = User.objects.get(username=username)
            if user.check_password(password):
                refresh = RefreshToken.for_user(user)
                return Response({
                    'access_token': str(refresh.access_token),
                    'refresh_token': str(refresh),
                })
            return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        except User.DoesNotExist:
            return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

def login(serializer,username,password):
    # Check if data is valid
    if serializer.is_valid():
        # Create the user
        serializer.save()
        try:
            user = User.objects.get(username=username)
            if user.check_password(password):
                refresh = RefreshToken.for_user(user)
                return Response({
                    'access_token': str(refresh.access_token),
                    'refresh_token': str(refresh),
                })
            return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        except User.DoesNotExist:
            return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RegisterUserView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        serializer = UserAccountSerializer(data=request.data)
        return login(serializer,username,password)

class RegisterCompanyView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        serializer = CompanyAccountSerializer(data=request.data)
        return login(serializer,username,password)

class GetRole(APIView):
    def get(self,request):
        user = request.user
        try:
            CompanyAccount.objects.get(id=user)
            return Response({"role": "company"}, status=status.HTTP_200_OK)
        except:
            pass

        try:
            UserAccount.objects.get(id=user)
            return Response({"role": "user"}, status=status.HTTP_200_OK)
        except:
            return Response({"error": "Invalid role"}, status=status.HTTP_401_UNAUTHORIZED)