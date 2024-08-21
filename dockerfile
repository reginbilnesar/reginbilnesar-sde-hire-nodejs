# Use Node.js 16 Alpine image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /usr/app

# Copy package.json and package-lock.json (if exists) and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your application code
COPY . .

# Set the working directory to the src directory
WORKDIR /usr/app/src

# Expose port 3000
EXPOSE 3000

# Define the command to run your app
CMD ["node", "app.js"]
