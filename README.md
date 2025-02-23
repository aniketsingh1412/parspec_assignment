Order Processing System
=========================

This project is a backend system built with TypeScript and Express that processes orders asynchronously. It uses PostgreSQL as the database (accessed via Sequelize) and runs PostgreSQL inside a Docker container via Docker Compose. The system also provides a metrics endpoint to observe order processing stats.

Table of Contents
-----------------
- Features
- Project Structure
- Requirements
- Getting Started
- Running Only the Database
- Running the Application
- API Endpoints
- Design Overview
- Future Enhancements

Features
--------
- Order Creation: Create orders with required details (userId, itemIds, totalAmount).
- Asynchronous Processing: Orders are enqueued for asynchronous processing, simulating a processing pipeline.
- Order Retrieval: Retrieve orders by ID.
- Metrics: Provides metrics on orders (e.g., total orders, processed orders, average processing time).
- Dockerized PostgreSQL: Runs a PostgreSQL database in a Docker container.
- Model-Service-Repository Pattern: Clean, modular code architecture.

Project Structure
-----------------
.
├── docker-compose.yml          # Docker Compose file to run PostgreSQL and optionally the Node app
├── Dockerfile                  # Dockerfile to build the Node app container
├── package.json                # Project dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── src
│   ├── config
│   │   └── db.ts             # Sequelize/DB initialization
│   ├── controllers
│   │   ├── orderController.ts
│   │   └── metricController.ts
│   ├── models
│   │   └── Order.ts          # Sequelize model definition for Order
│   ├── repositories
│   │   └── orderRepository.ts
│   ├── services
│   │   ├── orderService.ts
│   │   ├── queueService.ts
│   │   └── metricService.ts
│   ├── queue
│   │   └── queueProcessor.ts # In-memory queue processing simulation
│   ├── app.ts                # Main Express app with all routes defined inline
│   └── server.ts             # Entry point to start the app
└── README.txt

Requirements
------------
- Docker and Docker Compose installed on your machine.
- Node.js (v16 or later is recommended).

Getting Started
---------------
1. Clone the Repository

   git clone https://github.com/aniketsingh1412/parspec_assignment.git

2. Set Up Environment Variables (Optional)

   The project reads PostgreSQL connection settings from environment variables. You can modify these in the docker-compose.yml file if necessary:

   environment:
     POSTGRES_USER: myuser
     POSTGRES_PASSWORD: mypassword
     POSTGRES_DB: ordersdb

3. Build and Run with Docker Compose

   By default, running the following command will start all services defined in docker-compose.yml (both the PostgreSQL database and the Node app):

     docker-compose up --build

   However, if you want to run only the PostgreSQL database (and run your Node app locally), follow the "Running Only the Database" section below.

Running Only the Database
-------------------------
If you prefer to run just the PostgreSQL container from Docker Compose and run your Node/TypeScript application locally (or vice versa), you can start only the database service:

1. Open a terminal in your project directory.
2. Run the following command to start only the PostgreSQL container:

     docker-compose up -d db

   This command starts the database in detached mode.
3. Verify that PostgreSQL is running by checking the logs:

     docker-compose logs db

4. If you run your Node app locally, ensure your DB connection settings point to the correct host and port (e.g., if running locally, you may use 'localhost' and ensure port 5432 is published).

Running the Application
-----------------------
### Option A: Run Everything via Docker Compose
1. Run:

     docker-compose up --build

   This starts both PostgreSQL and your Node/TypeScript app in Docker containers.
2. The Node app will be available on port 3000.

### Option B: Run PostgreSQL via Docker and the Node App Locally
1. Start only the PostgreSQL container:

     docker-compose up -d db

2. Ensure that your Node application's DB configuration (in src/config/db.ts) uses:
   - Host: 'localhost' (if you have published port 5432)
   - Port: 5432
   - And the correct username, password, and database name.

3. Install dependencies, build, and run your Node app locally:

     yarn install
     yarn run build
     yarn start

4. Your Node app should now connect to the PostgreSQL instance running in Docker.

API Endpoints
-------------
1. Create Order
   - Endpoint: POST /orders
   - Request Body Example:

     {
       "userId": "user-123",
       "itemIds": ["item1", "item2"],
       "totalAmount": 59.99
     }

   - Response:

     {
       "order": {
         "id": 1,
         "userId": "user-123",
         "itemIds": ["item1", "item2"],
         "totalAmount": 59.99,
         "status": "PENDING",
         "createdAt": "2025-02-23T10:00:00.000Z",
         "updatedAt": "2025-02-23T10:00:00.000Z"
       }
     }

2. Get Order by ID
   - Endpoint: GET /orders/:id
   - Response Example:

     {
       "order": {
         "id": 1,
         "userId": "user-123",
         "itemIds": ["item1", "item2"],
         "totalAmount": 59.99,
         "status": "PROCESSING",
         "createdAt": "2025-02-23T10:00:00.000Z",
         "updatedAt": "2025-02-23T10:00:00.000Z",
         "processingStartTime": "2025-02-23T10:00:10.000Z",
         "processingEndTime": null
       }
     }

3. Metrics
   - Endpoint: GET /metrics
   - Response Example:

     {
       "totalOrders": 10,
       "processedCount": 5,
       "avgProcessingTime": 2.0,
       "statuses": {
         "pending": 2,
         "processing": 3,
         "completed": 5
       }
     }

Design Overview
---------------
- Sequelize ORM & PostgreSQL:
  The system uses Sequelize for ORM and connects to a PostgreSQL database running in Docker.

- Model-Service-Repository Pattern:
  - Models: Define data structures (e.g., Order model in src/models/Order.ts).
  - Repositories: Handle database operations (src/repositories/orderRepository.ts).
  - Services: Contain business logic (e.g., order creation, metrics calculation).
  - Queue Processing: An in-memory queue (with a simple setInterval loop) simulates asynchronous processing.

- Express Routing:
  All routes are defined inline in src/app.ts using async arrow functions.

License
-------
This project is licensed under the MIT License. See the LICENSE file for details.