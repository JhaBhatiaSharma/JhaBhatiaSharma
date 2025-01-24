# frontend/Dockerfile

FROM node:18

WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy remaining frontend code
COPY . .

# Vite typically runs on port 5173 by default
EXPOSE 5173

# Run "npm run dev" with "--host" so Docker can bind properly
CMD ["npm", "run", "dev", "--", "--host"]
