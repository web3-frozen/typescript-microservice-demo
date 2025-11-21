# TypeScript Microservice Demo

A production-ready TypeScript microservice application built with Express.js, featuring Docker containerization, CI/CD with GitHub Actions, comprehensive error handling, logging, and API validation.

## 🚀 Features

- **TypeScript** - Full type safety and modern JavaScript features
- **Express.js** - Fast, unopinionated web framework
- **Docker Support** - Multi-stage Dockerfile for optimized production builds
- **CI/CD Pipeline** - Automated testing, building, and Docker image publishing via GitHub Actions
- **Security** - Helmet.js, CORS, rate limiting
- **Logging** - Winston-based structured logging
- **Error Handling** - Centralized error handling middleware
- **API Validation** - Zod schema validation
- **Health Checks** - Ready, live, and health endpoints for container orchestration
- **Testing** - Jest test framework with TypeScript support
- **Code Quality** - ESLint for code linting

## 📋 Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- Docker (optional, for containerized deployment)
- Docker Compose (optional, for local development)

## 🛠️ Installation

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd typescript-microservice-demo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   Edit `.env` file with your configuration if needed.

4. **Create logs directory**
   ```bash
   mkdir -p logs
   ```

5. **Build the project**
   ```bash
   npm run build
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

   The server will start on `http://localhost:3000`

### Using Docker

1. **Build and run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

2. **Or build and run with Docker directly**
   ```bash
   # Build the image
   docker build -t typescript-microservice-demo .

   # Run the container
   docker run -p 3000:3000 --env-file .env typescript-microservice-demo
   ```

## 📚 API Endpoints

### Health Check Endpoints

- `GET /health` - Health check endpoint
- `GET /health/ready` - Readiness probe
- `GET /health/live` - Liveness probe

### API Endpoints

- `GET /api/v1` - API information
- `GET /api/v1/users` - Get all users
- `GET /api/v1/users/:id` - Get user by ID
- `POST /api/v1/users` - Create a new user
- `PUT /api/v1/users/:id` - Update a user
- `DELETE /api/v1/users/:id` - Delete a user
- `GET /api/v1/items` - Get all items (with pagination)
- `GET /api/v1/items/:id` - Get item by ID
- `POST /api/v1/items` - Create a new item
- `PUT /api/v1/items/:id` - Update an item
- `DELETE /api/v1/items/:id` - Delete an item

### Example API Requests

**Create a user:**
```bash
curl -X POST http://localhost:3000/api/v1/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com"
  }'
```

**Get all users:**
```bash
curl http://localhost:3000/api/v1/users
```

**Create an item:**
```bash
curl -X POST http://localhost:3000/api/v1/items \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Sample Item",
    "description": "A sample item description",
    "price": 29.99
  }'
```

**Get items with pagination:**
```bash
curl "http://localhost:3000/api/v1/items?page=1&limit=10"
```

## 🧪 Testing

Run tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

Run tests with coverage:
```bash
npm run test:coverage
```

## 🔍 Code Quality

Lint code:
```bash
npm run lint
```

Fix linting issues automatically:
```bash
npm run lint:fix
```

## 📦 Building for Production

Build the TypeScript code:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## 🐳 Docker Deployment

### Build Docker Image

```bash
docker build -t typescript-microservice-demo:latest .
```

### Run Docker Container

```bash
docker run -d \
  --name typescript-microservice-demo \
  -p 3000:3000 \
  --env-file .env \
  typescript-microservice-demo:latest
```

### Docker Compose

```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 🔄 CI/CD Pipeline

The project includes a GitHub Actions workflow (`.github/workflows/ci.yml`) that:

1. **Lints** the codebase
2. **Runs tests** with coverage
3. **Builds** the TypeScript application
4. **Builds and pushes** Docker images to GitHub Container Registry
5. **Scans** Docker images for security vulnerabilities

The workflow triggers on:
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches

### GitHub Container Registry

Docker images are automatically published to GitHub Container Registry:
```
ghcr.io/<your-username>/<repository-name>:latest
```

To pull the image:
```bash
docker pull ghcr.io/<your-username>/<repository-name>:latest
```

## 📁 Project Structure

```
.
├── src/
│   ├── __tests__/          # Test files
│   ├── config/             # Configuration files
│   ├── middleware/         # Express middleware
│   ├── routes/             # API routes
│   ├── utils/              # Utility functions
│   └── index.ts            # Application entry point
├── .github/
│   └── workflows/          # GitHub Actions workflows
├── dist/                   # Compiled JavaScript (generated)
├── logs/                   # Application logs (generated)
├── Dockerfile              # Docker configuration
├── docker-compose.yml      # Docker Compose configuration
├── tsconfig.json           # TypeScript configuration
├── jest.config.js          # Jest configuration
├── .eslintrc.json          # ESLint configuration
├── package.json            # Node.js dependencies
└── README.md               # This file
```

## 🔐 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `3000` |
| `LOG_LEVEL` | Logging level | `info` |
| `API_PREFIX` | API route prefix | `/api/v1` |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window in milliseconds | `900000` |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | `100` |
| `CORS_ORIGIN` | CORS allowed origin | `*` |

## 🚦 Health Checks

The application provides three health check endpoints:

- **`/health`** - General health check with uptime and version info
- **`/health/ready`** - Readiness probe (for Kubernetes)
- **`/health/live`** - Liveness probe (for Kubernetes)

These endpoints are used by container orchestration platforms (Kubernetes, Docker Swarm) to manage container lifecycle.

## 📝 Logging

The application uses Winston for structured logging. Logs are written to:
- `logs/combined.log` - All logs
- `logs/error.log` - Error logs only
- Console output (in development mode)

## 🔒 Security Features

- **Helmet.js** - Sets various HTTP headers for security
- **CORS** - Configurable Cross-Origin Resource Sharing
- **Rate Limiting** - Prevents abuse with configurable limits
- **Input Validation** - Zod schema validation for all inputs
- **Error Handling** - Secure error messages (stack traces only in development)

## 🛣️ Roadmap

Potential future enhancements:
- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] Authentication & Authorization (JWT)
- [ ] API documentation (Swagger/OpenAPI)
- [ ] Metrics and monitoring (Prometheus)
- [ ] Distributed tracing
- [ ] Message queue integration
- [ ] Caching layer (Redis)

## 📄 License

MIT License - feel free to use this project for learning or as a template for your own microservices.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For issues and questions, please open an issue on the GitHub repository.

---

**Built with ❤️ using TypeScript and Express.js**

