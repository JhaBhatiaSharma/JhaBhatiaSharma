FROM node:18

WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy source code
COPY . .

# Expose port 5001
EXPOSE 5001

# Start the backend server
CMD ["node", "server.js"]
