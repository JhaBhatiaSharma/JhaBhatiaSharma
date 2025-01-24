# backend/Dockerfile

# Use an official Node.js image
FROM node:18

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend code
COPY . .

# Expose the backend port
EXPOSE 5001

# By default we’ll run nodemon for hot reload in dev
CMD ["npx", "nodemon", "server.js"]
