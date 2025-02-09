from django.utils import timezone
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from accounts.models import CompanyAccount,UserAccount
from .models import CompanyPost, Location, Linker
from .serializers import CompanyPostSerializer
from datetime import datetime

def create_loc(info):
    print(info)
    loc = Location(
        address= info["address"],
        latitude = info["latitude"],
        longitude = info["longitude"]
    )
    loc.save()
    return loc
class CreateCompanyPost(APIView):
    def post(self,request):
        user = request.user
        
        if not user.has_perm("accounts.create_post"):
            return Response({'error': 'User lacks the required perms'}, status=status.HTTP_403_FORBIDDEN)
        
        user = request.user
        try:
            company_account = CompanyAccount.objects.get(id=request.user.id)
        except CompanyAccount.DoesNotExist:
                return Response({'error': 'CompanyAccount not found'}, status=status.HTTP_404_NOT_FOUND)
        
        now = timezone.now()
        content = request.data.get('content')
        start_location_str = request.data.get('start_location')
        end_location_str = request.data.get('end_location')
        end_time_str = request.data.get('end_time')
        start_time_str = request.data.get('start_time')
        title = request.data.get('title')

        if not content:
            return Response({'error': 'Content is required'}, status=status.HTTP_400_BAD_REQUEST)

        if not title:
            return Response({'error': 'Title is required'})    
        
        if not start_location_str or not end_location_str:
            return Response({'error': 'Start and End locations are required'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            try:
                start_location = Location.objects.get(address=start_location_str["address"])
            except Location.DoesNotExist:
                start_location = create_loc(start_location_str)
            
            try:
                end_location = Location.objects.get(address=end_location_str["address"])
            except Location.DoesNotExist:
                end_location  = create_loc(end_location_str)
        except Exception:
            return Response({"error": "Invalid location format"},status=status.HTTP_400_BAD_REQUEST)
        
        if not end_time_str:
            return Response({'error': 'End time is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            end_time = datetime.strptime(end_time_str, "%m/%d/%Y %H:%M:%S")
        except ValueError:
            return Response({'error': 'End time format should be d/m/y'}, status=status.HTTP_400_BAD_REQUEST)
        
        if not start_time_str:
            return Response({'error': 'Start time is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            start_time = datetime.strptime(start_time_str, "%m/%d/%Y %H:%M:%S")
        except ValueError:
            return Response({'error': 'Start time format should be d/m/y'}, status=status.HTTP_400_BAD_REQUEST)
        

        post = CompanyPost(
            title=title,
            user=company_account,
            message=content,
            start_location=start_location,
            post_time = now,
            start_time=start_time,
            end_location=end_location,
            end_time=end_time,
        )
        post.save()
        return Response({'message': 'Post created successfully'}, status=status.HTTP_200_OK)

class GetPosts(APIView):
    def get(self,request):
        #if not request.user.is_authenticated:
        #    return Response({"error","Please login"},status=status.HTTP_400_BAD_REQUEST)
        
        top_posts = CompanyPost.objects.all().order_by('-post_time')[:50]

        # Serialize the data
        serializer = CompanyPostSerializer(top_posts, many=True)
        
        # Return the serialized data as JSON
        return Response(serializer.data, status=status.HTTP_200_OK)

class PostApplications(APIView):
    def post(self,request):
        user = request.user
        if not user.is_authenticated:
            return Response({"error","Please login"}, status=status.HTTP_400_BAD_REQUEST)
        
        if not user.has_perm("accounts.apply_post"):
            return Response({'error': 'User lacks the required perms'}, status=status.HTTP_403_FORBIDDEN)
        
        try:
            account = UserAccount.objects.get(id=user.id)
        except UserAccount.DoesNotExist:
                return Response({'error': 'UserAccount not found'}, status=status.HTTP_404_NOT_FOUND)
        post = CompanyPost.objects.get(id=request.data.get("id"))
       
        if Linker.objects.filter(userid=account, post=post).exists():
            return Response({"error":"Duplicate Applicant"},status=status.HTTP_400_BAD_REQUEST)
        try: 
            linker = Linker(userid=account, post=post)
            linker.save()
        except Exception:
            return Response({"error":"invalid response"},status=status.HTTP_400_BAD_REQUEST)
        
        return Response({"message": "Successful Application Made"}, status=status.HTTP_200_OK)
    