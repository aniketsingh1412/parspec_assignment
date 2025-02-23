Library Management System – Setup Guide
=========================================

Prerequisites
-------------
Ensure you have the following installed:
- Node.js (Latest LTS version recommended)
- Yarn (Package manager)
- Docker & Docker Compose (For running PostgreSQL)

Step 1: Clone or Copy the Project
----------------------------------
Since this project is not on Git, copy the project folder to your local system. Navigate into the project directory using a terminal:

    cd library-management

Step 2: Set Up PostgreSQL with Docker
--------------------------------------
This project uses PostgreSQL running inside a Docker container. The docker-compose.yml file is already configured.

Start the database by running:

    docker-compose up -d

This will:
- Start a PostgreSQL 13 container
- Create a database named library_db
- Set up a user (library_user) with a password (library_pass)

To verify that PostgreSQL is running, execute:

    docker ps

You should see a container named library_postgres.

If you need to access the database shell:

    docker exec -it library_postgres psql -U library_user -d library_db

Exit the shell using:

    \q

Step 3: Configure Environment Variables
-----------------------------------------
Rename the `.env.example` file to `.env` and update the database credentials if necessary. The default values are:

    DB_NAME=library_db
    DB_USER=library_user
    DB_PASSWORD=library_pass
    DB_HOST=localhost
    DB_PORT=5432

Step 4: Install Dependencies
----------------------------
Install all required dependencies using Yarn:

    yarn install

Step 5: Build the Project
-------------------------
Compile the TypeScript code into JavaScript:

    yarn build

Step 6: Start the Server
------------------------
Run the application:

    yarn start

If everything is set up correctly, you should see output like this:

    Database connected successfully
    Server is running on port 3000

Step 7: Verify API Endpoints
----------------------------
You can now test the API using Postman, cURL, or any REST client.

Example: Fetch all books using curl:

    curl -X GET http://localhost:3000/books

To stop the application, press CTRL + C.

To stop the PostgreSQL container:

    docker-compose down

Troubleshooting
---------------
Database connection issues:
- Ensure the PostgreSQL container is running:
  
      docker ps
  
- If it’s not running, restart it:
  
      docker-compose up -d

Build errors:
- Ensure dependencies are installed:
  
      yarn install
  
- Try rebuilding:
  
      rm -rf dist && yarn build

Port conflicts:
- Check if another service is using port 3000 or 5432:
  
      lsof -i :3000
  
- Change the port in `.env` if needed.

Your Library Management System is now ready to use.
