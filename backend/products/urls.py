from django.urls import path
from .views import LatestProductsList, ProductDetail, CategoryDetail, CategoriesList, ProductSearch


urlpatterns = [
    path('latest-products/', LatestProductsList.as_view()),
    path('products/search/', ProductSearch.as_view()),
    path('products/<slug:parent_category>/<slug:child_category>/<slug:product_slug>/', ProductDetail.as_view()),
    path('products/<slug:parent_category>/<slug:child_category>/', CategoryDetail.as_view()),
    path('products/<slug:parent_category>/', CategoryDetail.as_view()),
    path('products/', CategoriesList.as_view()),

]
