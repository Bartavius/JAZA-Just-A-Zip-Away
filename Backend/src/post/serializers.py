from rest_framework import serializers
from .models import CompanyPost,Location

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ['address', 'latitude', 'longitude']
    
class CompanyPostSerializer(serializers.ModelSerializer):
    start_location_address = serializers.CharField(source='start_location.address', read_only=True)
    end_location_address = serializers.CharField(source='end_location.address', read_only=True)
    class Meta:
        model = CompanyPost
        fields = ['id','title', 'user', 'message', 'post_time','start_time','end_time','start_location_address','end_location_address']

    def get_address(self, obj):
        return f"{obj.address}"