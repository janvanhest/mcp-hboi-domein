# 🐳 HBOI MCP Server - Docker Setup

## Quick Start

### 1. Build Docker Image
```bash
# Build the image
docker build -t hboi-mcp-server:latest .

# Or use yarn script
yarn docker:build
```

### 2. Run Container
```bash
# Run the MCP server
docker run --rm -i hboi-mcp-server:latest

# Or use yarn script
yarn docker:run
```

### 3. Test Container
```bash
# Test if container works
docker run --rm hboi-mcp-server:latest node -e "console.log('MCP Server is working!')"
```

## Development

### Development Mode
```bash
# Run in development mode (local)
yarn dev
```

### Debug Container
```bash
# Run with debug logging
docker run --rm -i -e LOG_LEVEL=debug hboi-mcp-server:latest
```

## Cursor Integration

### 1. Add to Cursor MCP Config
Add this to your Cursor MCP configuration:

```json
{
  "mcpServers": {
    "hboi-mcp-server": {
      "command": "docker",
      "args": [
        "run",
        "--rm",
        "-i",
        "--name",
        "hboi-mcp-server",
        "hboi-mcp-server:latest"
      ],
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
```

### 2. Test in Cursor
1. Restart Cursor
2. Open a chat
3. Try: "What HBO-i activities are available?"
4. The MCP server should respond with HBO-i data

## Available Tools

The MCP server provides these tools:

- `validate_hboi_data` - Validate data against HBO-i schema
- `get_hboi_info` - Get information about HBO-i domain
- `get_beroepstaken` - Get professional tasks
- `search_hboi` - Search in HBO-i data
- `get_activiteiten` - Get all activities
- `get_architectuurlagen` - Get architecture layers
- `get_beheersingsniveaus` - Get proficiency levels
- `get_competenties_for_activiteit` - Get competencies for activity
- `filter_beroepstaken` - Filter professional tasks
- `get_progression_path` - Get progression paths

## Troubleshooting

### Container Won't Start
```bash
# Check logs
docker logs hboi-mcp-server

# Run with debug
docker run --rm -i -e LOG_LEVEL=debug hboi-mcp-server:latest
```

### Cursor Can't Connect
1. Make sure Docker is running
2. Check if image exists: `docker images hboi-mcp-server`
3. Test container manually: `docker run --rm -i hboi-mcp-server:latest`

### Performance Issues
```bash
# Run with resource limits
docker run --rm -i --memory=512m --cpus=1 hboi-mcp-server:latest
```

## Production Deployment

### Environment Variables
```bash
docker run --rm -i \
  -e NODE_ENV=production \
  -e LOG_LEVEL=info \
  hboi-mcp-server:latest
```

### Health Checks
```bash
# Check container health
docker inspect hboi-mcp-server --format='{{.State.Health.Status}}'
```

### Monitoring
```bash
# View container stats
docker stats hboi-mcp-server
```

## Security

The container runs as a non-root user (`mcp`) for security.

### File Permissions
- Data files are mounted read-only
- No write access to host system
- Isolated environment

### Network
- No exposed ports by default
- Uses stdio for MCP communication
- No external network access needed
