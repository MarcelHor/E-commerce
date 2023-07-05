from rest_framework import serializers
from .models import Category, Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = (
            'id',
            'name',
            'get_absolute_url',
            'description',
            'price',
            'get_image',
            'get_thumbnail',
            'in_stock',
        )


class CategorySerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True)
    children = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = (
            'id',
            'name',
            'get_absolute_url',
            'get_image',
            'get_thumbnail',
            'products',
            'children',  # new
        )

    def get_children(self, instance):
        """
        Get the serialized children of the current category.
        """
        serializer = self.__class__(instance.children.all(), many=True)
        return serializer.data


class CategoriesListSerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = (
            'id',
            'name',
            'get_absolute_url',
            'get_image',
            'get_thumbnail',
            'children',  # new
        )

    def get_children(self, instance):
        """
        Get the serialized children of the current category.
        """
        serializer = self.__class__(instance.children.all(), many=True)
        return serializer.data
