# Use the official Nginx image as the base
FROM nginx:latest

# Remove the default static files from Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copy your project's static files into the container
COPY . /usr/share/nginx/html

# Expose port 80 for the container
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
