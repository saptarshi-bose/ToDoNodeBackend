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


To Use the APIs:
1. Create User First: Method: Post
http://localhost:5001/user/ with payload like {
   "username":"user",
   "password":"1234"
   }

On success, Proper Confirmation will be sent as response.

2. Login with username password: Method: Post
   http://localhost:5001/user/login with payload like {
   "username":"user",
   "password":"1234"
   }

On success, proper message and token will be returned.

All APIs Down below requires the jwt Token which was returned after successfully login. Add Authorization in Header with "Bearer ${token}".

3. To Add a item to TodoList: Method: Post
   http://localhost:5001/todos/ with payload like {
   "todoText": "My first ToDo Item"
   }


   On success, proper message will be returned.


4.  To list All Todo Items by User: Method: Get
    http://localhost:5001/todos/ 

    On success, List ToDo Item List will be returned

5. To get a Todo Item: Method: Get
    http://localhost:5001/todos/{id}

   On success, the ToDo Item will be returned

6. To update a TodoItem: Method: Patch
   http://localhost:5001/todos/{id}
   
  payload like {
   "todoText": "My first ToDo Item. To be finished By EOD."
   }
  
7. To delete a TodoItem: Method: Delete
   http://localhost:5001/todos/{id}