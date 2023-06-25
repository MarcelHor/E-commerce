from django.urls import path
from .views import LatestProductsList, ProductDetail, CategoryDetail, CategoriesList, ProductSearch

urlpatterns = [
    path('latest-products/', LatestProductsList.as_view()),
    path('products/search/', ProductSearch.as_view()),
    path('products/<slug:category_slug>/<slug:product_slug>/', ProductDetail.as_view()),
    path('products/<slug:category_slug>/', CategoryDetail.as_view()),
    path('products/', CategoriesList.as_view()),
]

