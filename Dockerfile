# Use the latest LTS version of Node.js
FROM node:lts

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Set environment variables from the .env file
# ENV NODE_ENV=production

# Start the application
CMD ["npm", "start"]
