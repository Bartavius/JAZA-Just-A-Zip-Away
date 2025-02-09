from django.urls import path

from .views import CreateCompanyPost, GetPosts, PostApplications, ViewPosts, GetAppliedPosts

urlpatterns = [
    path("create/", CreateCompanyPost.as_view(), name="create_post"),
    path("get/", GetPosts.as_view(), name="get_post"),
    path("apply/", PostApplications.as_view(), name="apply_post"),
    path("view-applied/", ViewPosts.as_view(), name="applied_to"),
    path("get-applied/<int:pk>", GetAppliedPosts.as_view(), name="get_applied")
]