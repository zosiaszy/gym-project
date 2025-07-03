# Stage 1: React
FROM node AS frontend
WORKDIR /frontend
COPY frontend/ ./
RUN npm install
RUN npm run build

# Stage 2: Django
FROM python:3.13 AS backend
WORKDIR /backend
COPY backend/requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

COPY backend/ .
RUN mkdir -p gym/staticfiles
RUN python gym/manage.py collectstatic --noinput

# Stage 3: Nginx
FROM nginx:stable-alpine AS production
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/django_react.conf /etc/nginx/conf.d/
COPY --from=backend /backend/gym/staticfiles /usr/share/nginx/html/static
COPY --from=frontend /frontend/dist /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
