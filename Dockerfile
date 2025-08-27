# Use official Node.js LTS image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first (better cache)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application
COPY . .

# Expose port 3002
EXPOSE 3002

# Run app
CMD ["npm", "start"]