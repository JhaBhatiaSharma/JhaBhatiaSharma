# Set default build target to 'dev' if not provided
ARG TARGET=dev

# Use Node.js for building the frontend
FROM node:18 AS build

WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the source code
COPY . .

# Check if the target is 'prod' (for production)
RUN if [ "$TARGET" = "prod" ]; then npm run build; fi

# Serve the frontend using Nginx if it's a production build
FROM nginx:latest AS production
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for production
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# Default to running in dev mode if no target is specified
FROM node:18 AS development
WORKDIR /app
COPY --from=build /app .
CMD ["npm", "run", "dev", "--", "--host"]
