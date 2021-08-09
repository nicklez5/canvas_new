from django.urls import path, include, re_path
from rest_framework.urlpatterns import format_suffix_patterns 
from . import views 

urlpatterns = [
    path('',views.apiOverview, name="api-overview"),
    path('list/', views.UserList.as_view()),
    path('register/', views.RegisterView.as_view()),
    path('login/', views.UserLoginView.as_view()),
    path('detail/<str:pk>', views.UserView.as_view()), 
]

urlpatterns = format_suffix_patterns(urlpatterns)


