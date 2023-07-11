from io import BytesIO
from PIL import Image

from django.core.files import File
from django.core.exceptions import ValidationError
from django.db import models


def make_thumbnail(image, size=(300, 200)):
    """
    Creates a thumbnail image from an existing one.
    """
    try:
        img = Image.open(image)
        img.verify()
    except (IOError, SyntaxError):
        raise ValidationError('Invalid image')

    img = Image.open(image)
    img = img.convert('RGB')
    img.thumbnail(size)

    thumb_io = BytesIO()
    img.save(thumb_io, 'JPEG', quality=85)

    thumbnail = File(thumb_io, name=image.name)

    return thumbnail


class Category(models.Model):
    parent = models.ForeignKey('self', related_name='children', on_delete=models.CASCADE, blank=True, null=True)
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    image = models.ImageField(upload_to='uploads/', blank=True, null=True)
    thumbnail = models.ImageField(upload_to='uploads/', blank=True, null=True)

    class Meta:
        ordering = ('name',)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        if self.parent:
            return f'/products/{self.parent.slug}/{self.slug}/'
        else:
            return f'/products/{self.slug}/'

    def get_image(self):
        if self.image:
            return self.image.url
        return ''

    def get_thumbnail(self):
        if self.thumbnail:
            return self.thumbnail.url
        else:
            if self.image:
                try:
                    self.thumbnail = make_thumbnail(self.image)
                    self.save()
                except ValidationError as e:
                    print('Invalid image: ', e)
                return self.thumbnail.url
            else:
                return ''


class Product(models.Model):
    category = models.ForeignKey(Category, related_name='products', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    image = models.ImageField(upload_to='uploads/', blank=True, null=True)
    thumbnail = models.ImageField(upload_to='uploads/', blank=True, null=True)
    date_added = models.DateTimeField(auto_now_add=True)
    in_stock = models.BooleanField(default=True)

    class Meta:
        ordering = ('-date_added',)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        if self.category.parent:
            return f'/products/{self.category.parent.slug}/{self.category.slug}/product/{self.slug}/'
        else:
            return f'/products/{self.category.slug}/product/{self.slug}/'

    def get_image(self):
        if self.image:
            return self.image.url
        return ''

    def get_thumbnail(self):
        if self.thumbnail:
            return self.thumbnail.url
        else:
            if self.image:
                try:
                    self.thumbnail = make_thumbnail(self.image)
                    self.save()
                except ValidationError as e:
                    print('Invalid image: ', e)
                return self.thumbnail.url
            else:
                return ''
