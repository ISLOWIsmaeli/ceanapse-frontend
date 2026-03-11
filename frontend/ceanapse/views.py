from django.shortcuts import render

# Create your views here.
def frontend_home(request):
    return render(request, "ceanapse/home.html")
def impacts_page(request):
    return render(request, "ceanapse/impact.html")
def about_page(request):
    return render(request, "ceanapse/about.html")
def team_page(request):
    return render(request, "ceanapse/team.html")
def donate_page(request):
    return render(request, "ceanapse/donate.html")