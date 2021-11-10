### Run with Docker
`sudo docker-compose up --build`

#### Api endpoints.

##### Task CRUD operations
```
GET http://localhost/api/todos
GET http://localhost/api/todos/id
POST http://localhost/api/todos 
PUT http://localhost/api/todos/id
DELETE http://localhost/api/todos/id

```
##### auth operations
```
POST http://localhost/api/auth/signin 
POST http://localhost/api/auth/signup 
```

### Run with npm
`npm i`
set db mongodb url env DB_URL
`npm run start`
