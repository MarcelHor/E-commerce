from django.db.models import Q
from django.http import Http404
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import ProductSerializer, CategoriesListSerializer, CategorySerializer
from .models import Product, Category


class LatestProductsList(APIView):
    def get(self, request):
        products = Product.objects.all()[0:4]
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)


class ProductDetail(APIView):
    def get(self, request, parent_category, child_category=None, product_slug=None):
        try:
            if child_category is not None and product_slug is not None:
                product = Product.objects.filter(category__parent__slug=parent_category, category__slug=child_category).get(slug=product_slug)
            elif product_slug is not None: # case where there is no child category but there is a product
                product = Product.objects.filter(category__slug=parent_category).get(slug=product_slug)
            else:
                raise Http404
            serializer = ProductSerializer(product)
            return Response(serializer.data)
        except Product.DoesNotExist:
            raise Http404


class CategoryDetail(APIView):
    def get(self, request, parent_category, child_category=None):
        try:
            if child_category is not None:
                category = Category.objects.filter(parent__slug=parent_category).get(slug=child_category)
                serializer = CategorySerializer(category)
            else:
                categories = Category.objects.filter(slug=parent_category)
                serializer = CategorySerializer(categories, many=True)
            return Response(serializer.data)
        except Category.DoesNotExist:
            raise Http404


class CategoriesList(APIView):
    def get(self, request):
        root_categories = Category.objects.filter(parent=None)
        serializer = CategoriesListSerializer(root_categories, many=True)
        return Response(serializer.data)


class ProductSearch(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        query = self.request.query_params.get('q', '')
        return Product.objects.filter(Q(name__icontains=query) | Q(description__icontains=query))[:3]
