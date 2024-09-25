# Stage 1: Build the application using Node.js 16 Alpine
FROM node:16-alpine AS builder

# Set the working directory inside the container
WORKDIR /usr/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install production dependencies
RUN npm ci --only=production || npm install --only=production

# Copy the rest of the application code
COPY . .

# Stage 2: Use a Distroless base image for the runtime environment
FROM gcr.io/distroless/nodejs16

# Set the working directory inside the container
WORKDIR /usr/app/src

# Copy the application from the build stage
COPY --from=builder /usr/app /usr/app

# Expose port 3000 to the host
EXPOSE 3000

# Define the command to run your app
CMD ["app.js"]
