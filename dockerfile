# Build stage for frontend
FROM node:18-alpine as frontend-builder
WORKDIR /app/client

# Copy package files first
COPY client/package*.json ./

# Install dependencies
RUN npm install

# Declare build arguments
ARG VITE_GOOGLE_CLIENT_ID
ARG VITE_GEMINI_API
ARG VITE_FIREBASE_API
ARG VITE_FIREBASE_DOMAIN
ARG VITE_FIREBASE_PROJECT_ID
ARG VITE_FIREBASE_STORAGE_BUCKET
ARG VITE_FIREBASE_MESSAGING_SENDER_ID
ARG VITE_FIREBASE_APP_ID
ARG VITE_FIREBASE_MEASUREMENT_ID
ARG VITE_BACKEND_URL

# Create .env file with all the build arguments
RUN echo "VITE_GOOGLE_CLIENT_ID=${VITE_GOOGLE_CLIENT_ID}" > .env && \
    echo "VITE_GEMINI_API=${VITE_GEMINI_API}" >> .env && \
    echo "VITE_FIREBASE_API=${VITE_FIREBASE_API}" >> .env && \
    echo "VITE_FIREBASE_DOMAIN=${VITE_FIREBASE_DOMAIN}" >> .env && \
    echo "VITE_FIREBASE_PROJECT_ID=${VITE_FIREBASE_PROJECT_ID}" >> .env && \
    echo "VITE_FIREBASE_STORAGE_BUCKET=${VITE_FIREBASE_STORAGE_BUCKET}" >> .env && \
    echo "VITE_FIREBASE_MESSAGING_SENDER_ID=${VITE_FIREBASE_MESSAGING_SENDER_ID}" >> .env && \
    echo "VITE_FIREBASE_APP_ID=${VITE_FIREBASE_APP_ID}" >> .env && \
    echo "VITE_FIREBASE_MEASUREMENT_ID=${VITE_FIREBASE_MEASUREMENT_ID}" >> .env && \
    echo "VITE_BACKEND_URL=${VITE_BACKEND_URL}" >> .env

# Copy the rest of the frontend files
COPY client/ ./

# Build frontend
RUN npm run build

# Main stage
FROM node:18-alpine
WORKDIR /app

# Copy backend package files first
COPY server/package*.json ./server/
WORKDIR /app/server
RUN npm install

# Copy the rest of the backend files
COPY server/ ./

# Copy built frontend files from previous stage
COPY --from=frontend-builder /app/client/dist ../client/dist

# Set environment variables
ENV NODE_ENV=production \
    PORT=4000

EXPOSE 4000
CMD ["node", "index.js"]