# Stage 1: Build dependencies
FROM node:20-slim AS builder

# Set working directory
WORKDIR /app

# Install OS packages needed for building (if any native deps)
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 g++ make \
    && rm -rf /var/lib/apt/lists/*

# Copy only dependency manifests first (for cache efficiency)
COPY app/package*.json ./

# Install dependencies
RUN npm ci --omit=dev

# Copy app source code
COPY app/ .

# Build the app if necessary (skip if not applicable)
# RUN npm run build

# Stage 2: Runtime - small, secure image
FROM node:20-slim

# Create non-root user
RUN useradd -m appuser

# Set working directory
WORKDIR /app

# Copy only needed files from builder stage
COPY --from=builder /app /app

# Ensure secure permissions
RUN chown -R appuser:appuser /app && chmod -R 755 /app

# Use non-root user
USER appuser

# Expose port if needed (e.g., 3000)
# EXPOSE 3000

# Default command
CMD ["node", "index.js"]
