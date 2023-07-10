from rest_framework import serializers
from .models import Order, OrderItem
from django.core.mail import send_mail


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

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        order = Order.objects.create(**validated_data)
        for item_data in items_data:
            OrderItem.objects.create(order=order, **item_data)

        send_order_email(order)
        return order


def send_order_email(order):
    subject = f'Order {order.id}'
    message = f'Dear {order.first_name},\n\n' \
              f'Thank you for your order. Your order number is {order.id}.' \
              f'\n\nKind regards,\n\nE-commerce team'
    email_from = 'marcel.stinbank@gmail.com'
    recipient_list = [order.email, ]

    send_mail(subject, message, email_from, recipient_list)
