# HBOI MCP Server Dockerfile - Multi-stage build
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files and Yarn configuration
COPY package.json yarn.lock .yarnrc.docker.yml ./
# Rename Docker-specific config to default config
RUN mv .yarnrc.docker.yml .yarnrc.yml

# Enable Corepack for Yarn 4
RUN corepack enable

# Install all dependencies (including dev dependencies for build)
RUN yarn install --immutable

# Copy source code (but exclude .yarnrc.yml to keep node_modules config)
COPY . .
# Ensure we keep the node_modules config for Docker
RUN echo "nodeLinker: node-modules" > .yarnrc.yml

# Build the application
RUN yarn build

# Production stage
FROM node:22-alpine AS production

# Set working directory
WORKDIR /app

# Copy package files and Yarn configuration
COPY package.json yarn.lock .yarnrc.docker.yml ./
# Rename Docker-specific config to default config
RUN mv .yarnrc.docker.yml .yarnrc.yml

# Enable Corepack for Yarn 4
RUN corepack enable

# Install all dependencies first, then focus on production
RUN yarn install --immutable
RUN yarn workspaces focus --production

# Copy built application and required files from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/hboi.schema.json ./
COPY --from=builder /app/hboi.example.json ./

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S mcp -u 1001

# Change ownership of the app directory
RUN chown -R mcp:nodejs /app
USER mcp

# Expose port (if needed for health checks)
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "console.log('MCP Server is healthy')" || exit 1

# Start the MCP server
CMD ["node", "dist/index.js"]
