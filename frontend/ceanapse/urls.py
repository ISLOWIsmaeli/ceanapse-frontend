from django.urls import path
from . import views

urlpatterns = [
    path("", views.frontend_home, name="frontend-home"),
    path("impacts", views.impacts_page,name="impacts-page"),
    path("about", views.about_page,name="about-page"),
    path("team", views.team_page,name="team-page"),
    path("donate",views.donate_page,name="donate-page"),
]
