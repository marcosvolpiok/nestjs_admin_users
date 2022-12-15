* REQUIREMENTS *
A new company needs to address these requirements:
Create a Node API with Typescript.
Connect the Node API to MongoDB using mongoose (desirable models in typescript).
We need to develop three endpoints behind a basic authentication (username and password).
Create a user with name, last name, address, and profile picture (this should be a file).
Retrieve users.
Update user.
Star point: Dockerize MongoDB and the Node API
 
 
* Run *
docker build .
docker-compose up
 
* Install seeds *
sudo docker-compose run --rm challenge npx nestjs-command create:user
 
* Import Postman Collection and Environment *
Importing these files (files: Challenge Kenility.postman_collection.json and Challenge Kenility.postman_environment.json, they are on the root directory) you'll be able to test the API.
 
* Using the API *
You can sign up on the API by creating a user with the endpoint: http://{{host}}:{{port}}/user
So, you'll need to log in with the endpoint: http://{{host}}:{{port}}/login
Next, you should set the Bearer Token on Postman with that token (you can set the environment variable)
Then you'll be able to get the users with the endpoint: http://{{host}}:{{port}}/user, update any user (endpoint: http://{{host}}:{{port}}/user/:id), and upload files with the endpoint (endpoint http://{{host}}:{{port}}/user/avatar/:id)





