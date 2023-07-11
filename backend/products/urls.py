from django.urls import path
from .views import LatestProductsList, ProductDetailPage, CategoryDetail, CategoryList, ProductSearch


urlpatterns = [
    path('latest-products/', LatestProductsList.as_view()),
    path('products/search/', ProductSearch.as_view()),
    path('products/<slug:parent_category>/<slug:child_category>/product/<slug:product_slug>/', ProductDetailPage.as_view()),
    path('products/<slug:parent_category>/product/<slug:product_slug>/', ProductDetailPage.as_view()),
    path('products/<slug:parent_category>/<slug:child_category>/', CategoryDetail.as_view()),
    path('products/<slug:parent_category>/', CategoryDetail.as_view()),
    path('products/', CategoryList.as_view()),

]
