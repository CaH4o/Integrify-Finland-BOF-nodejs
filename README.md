# Requirement:

1. create a http server using http module from nodejs in server.js file

2. after creating the server, run your server by: `yarn start or npm start`

3. The server should have the following spec:

   - `GET /msg`: return the content of `data.txt`
   - `GET /users`: return the content of `user.json`
   - `POST /`: add new user into `user.json`
   - `PUT /:userId`: update the user by user Id
   - `DELETE /:userId`: delete a user in `user.json`
