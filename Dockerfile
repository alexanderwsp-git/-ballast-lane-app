# Use the official Node.js base image
FROM --platform=linux/amd64 node:18-alpine

# Set working directory within the container
WORKDIR /app

# Copy package.json and package-lock.json (if using)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy your application code
COPY . .

# Expose the port where your application listens
EXPOSE 3000

# Start the application using the command defined in your package.json (usually "npm start")
CMD [ "npm", "start" ]
