# Build stage for frontend
FROM node:18-alpine as frontend-builder
WORKDIR /app/client

# Declare build arguments
ARG VITE_GOOGLE_CLIENT_ID
ARG VITE_BACKEND_URL

# Copy frontend files
COPY client/ ./

# Create .env file with the build arguments
RUN echo "VITE_GOOGLE_CLIENT_ID=${VITE_GOOGLE_CLIENT_ID}" > .env

# Install and build frontend
RUN npm install
RUN npm run build

# Main stage
FROM node:18-alpine
WORKDIR /app

# Copy backend files and install dependencies
COPY server/ ./server/
WORKDIR /app/server
RUN npm install

# Copy built frontend files from previous stage
COPY --from=frontend-builder /app/client/dist ../client/dist

# Set environment variables
ENV NODE_ENV=production \
    PORT=4000

EXPOSE 4000
CMD ["node", "index.js"]