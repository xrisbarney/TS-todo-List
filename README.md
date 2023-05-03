# ToDo list API

## Description

This repository contains the API endpoints required to create, read, update and delete (CRUD) items from a todo list.

## Documentation

### API endpoints
The todo-api.postman collection contains all the API endpoints and how to run them. In order to use it, launch Postman and import it as a collection.

### Setting up the database
This application used a docker container to run the PostGres database instance. To create your database instance using the docker container, follow the steps below:
- Navigate to the directory `db` in this repository. 
- Move the file `docker-compose.yml` to the directory where you want to run the DB container from. Ensure that docker and docker-compose is installed on the computer you want to run the computer on.
- Update the container with your preferred credentials for the following variables:
  ```
  POSTGRES_USER: postgres
  POSTGRES_PASSWORD: password
  POSTGRES_DB: todolist
  ```
- Run the docker compose file in detached mode
  ```
  docker-compose up -d
  ```

### Setting up the Node application
<i>It is assumed you have node already installed</i>

In order to run the node application follow the steps below:

- Clone the repository.
  ```
  git clone https://github.com/xrisbarney/TS-todo-List.git
  ```
- Enter the cloned directory
- Install the application dependencies.
  ```
  npm install
  ```
- Create a .env file in the root directory of the cloned application. Then add the the content below:
  ```
  PORT="3000"
  DATABASE_USER="<db_user>"
  DATABASE_HOST="<db_host>"
  DATABASE_PASSWORD="<db_password>"
  DATABASE_PORT="<docker_db_port>"
  DATABASE_NAME="<db_name>"
  DATABASE_URL=postgres://<db_user>:<db_password>@<db_host>:<docker_db_port>/<db_name>?sslmode=disable
  ```
Ensure you replace all variables in <> with their proper values.
- Start the application by running the command below:
  ```
  npm start
  ```

- To build the application for prod environments/transpile to JavaScript, run the command below
  ```
  npm build
  ```
- To run the built application in detached mode, run the command below:
  ```
  pm2 start npm -- build/index.js
  ```

## Extending the API to support user management
To support user management, the following will need to be taken into consideration:
- We will need to create a User entity and model that maps to a users table in the database. The User entity will have a one-to-many relationship with the Todo entity, where each user can have multiple todos.
- We'll also need to update the Todo entity to include a user field that represents the owner hof the todo.
- We'll need to add login and registration endpoints.
- JWT will be added to generate tokens for users after successful login.
- All endpoints will be updated to validate JWT tokens before providing responses.
- Queries will be updated to retrieve requests mapped to a specific user ID.
- Requests to the endpoints will have to be sent with an authorization header.


