from rest_framework import serializers
from .models import Order, OrderItem

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['product', 'price', 'quantity']


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = ['first_name', 'last_name', 'country', 'city', 'street', 'zipcode',
                  'email', 'phone', 'is_company', 'company_name', 'ICO', 'DIC',
                  'is_shipping_address_different', 'shipping_first_name', 'shipping_last_name',
                  'shipping_country', 'shipping_city', 'shipping_street', 'shipping_zipcode',
                  'delivery_option', 'order_note', 'created_at', 'updated_at', 'paid',
                  'paid_amount', 'items']
