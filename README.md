Note:
The Database as well as the node backend is containerized in a docker image.

To run locally:

Prerequisite:
Node Version 16,  Docker Desktop


The contents of .env is:

````
PORT=5001

DB_USER='postgres'
DB_HOST='db'
DB_NAME='toDoProject'
DB_PASSWORD='toDoProjectPassword'
DB_PORT=5432

JWT_SECRET="xxxx"
JWT_EXP="2h" 
````

Steps:
 1. Create a .env file in root and add the contents above
 2. Run `npm i`
 3. Run `docker-compose up`
