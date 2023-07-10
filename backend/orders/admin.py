from django.contrib import admin
from .models import Order, OrderItem



class OrderItemInline(admin.TabularInline):
    model = OrderItem
    raw_id_fields = ['product']
    fields = ['product', 'price', 'quantity']
    readonly_fields = ['product', 'price', 'quantity']



@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    inlines = [OrderItemInline, ]
    list_display = ['id', 'first_name', 'last_name', 'email', 'phone', 'paid', 'paid_amount', 'created_at', 'updated_at']
    list_filter = ['paid', 'created_at', 'updated_at']
    search_fields = ['first_name', 'last_name', 'email', 'phone', 'street', 'zipcode', 'city', 'country']
    readonly_fields = ['first_name', 'last_name', 'country', 'city', 'street', 'zipcode',
                        'email', 'phone', 'is_company', 'company_name', 'ICO', 'DIC',
                        'is_shipping_address_different', 'shipping_first_name', 'shipping_last_name',
                        'shipping_country', 'shipping_city', 'shipping_street', 'shipping_zipcode',
                        'delivery_option', 'order_note', 'created_at', 'updated_at', 'paid',
                        'paid_amount', 'get_order_items', 'get_address']

    

    def get_order_items(self, obj):
        return ", ".join([str(item.product) + " (" + str(item.quantity) + ")" for item in obj.items.all()])

    get_order_items.short_description = 'Order Items'

    def get_address(self, obj):
        return f'{obj.street}, {obj.zipcode} {obj.city}, {obj.country}'

    get_address.short_description = 'Address'
