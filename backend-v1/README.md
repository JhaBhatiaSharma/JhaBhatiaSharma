# Backend

## How to run the backend server

### Step 1 - Docker
You need to have docker installed on your PC.

### Step 2 - Build the server
Run in the terminal:
``` bash
docker compose up --build
```

### Step 3 - Run migrations for database schema creation
Open a new terminal and type the command run to migrations
``` bash
docker exec web bash npx sequelize-cli db:migrate
```

After this the database schema will be created and you can run all the endpoints.
It is advised to run `/api/v1/health` to check if the the backend is running successfully!
