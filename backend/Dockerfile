FROM python:3.9

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV PYTHONUNBUFFERED=1
ENV DJANGO_ENV=production

RUN python manage.py migrate

EXPOSE 8000

ENV ENV_FILE=/app/.env

RUN python manage.py collectstatic --noinput

CMD ["sh", "-c", "export $(cat /app/.env | xargs) && gunicorn --bind 0.0.0.0:8000 ecommerce.wsgi:application"]
# docker run -p 8000:8000 -v /var/www/.env:/app/.env marcelus1231/backend:latest
# docker build -t marcelus1231/backend:latest .
# docker push marcelus1231/backend:<tagname>

