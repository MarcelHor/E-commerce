from django.db import models


DELIVERY_CHOICES = (
    ('standard', 'Standard Shipping - Extra 5 USD'),
    ('pickup', 'Pickup - No Extra Charge'),
)

class Order(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    country = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    street = models.CharField(max_length=255)
    zipcode = models.CharField(max_length=255)

    email = models.EmailField()
    phone = models.CharField(max_length=255)

    # If the user is buying on behalf of a company
    is_company = models.BooleanField(default=False)
    company_name = models.CharField(max_length=255, null=True, blank=True)
    ICO = models.CharField(max_length=255, null=True, blank=True)
    DIC = models.CharField(max_length=255, null=True, blank=True)

    # If the user adres is different from the billing address
    is_shipping_address_different = models.BooleanField(default=False)
    shipping_first_name = models.CharField(max_length=255, null=True, blank=True)
    shipping_last_name = models.CharField(max_length=255, null=True, blank=True)
    shipping_country = models.CharField(max_length=255, null=True, blank=True)
    shipping_city = models.CharField(max_length=255, null=True, blank=True)
    shipping_street = models.CharField(max_length=255, null=True, blank=True)
    shipping_zipcode = models.CharField(max_length=255, null=True, blank=True)

    # Delivery method
    delivery_option = models.CharField(max_length=10, choices=DELIVERY_CHOICES, default='standard')

    order_note = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    paid = models.BooleanField(default=False)
    paid_amount = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'Order {self.id}'


class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey('products.Product', related_name='order_items', on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f'{self.id}'
