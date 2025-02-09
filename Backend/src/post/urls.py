from django.urls import path

from .views import CreateCompanyPost, GetPosts, PostApplications

urlpatterns = [
    path("create/", CreateCompanyPost.as_view(), name="create_post"),
    path("get/", GetPosts.as_view(), name="get_post"),
    path("apply/", PostApplications.as_view(), name="apply_post")

]