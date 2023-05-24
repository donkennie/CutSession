# **CutSession API**

CutSession is an application by which user can schedule pre-wedding photo session and also book any sessions of their interests.

![Uploading 2-logo-Open-Studio.jpg…]()


## **Features Implemented**

> - Each endpoint clearly specifies any query/path parameter or request body, as well as the data types and constraints for each data field

> - User authentication using JWT (JSON Web Tokens)

> - Using MongoDB

> - Apply validations where necessary and return the right 4xx HTTP error if the API is called with the wrong data

> - The API response for creating a booking contains a bookingRef which is a 6 to 9 character long alpha-numeric value

> - Apply a business logic design pattern to make your code and implementation more robust

> - Integrate an API logging and monitoring tool(Morgan)

> - Load-test the deployed API application using Postman. Here is the link, https://app.getpostman.com/join-team?invite_code=a5d116fe45ec86d3504278860a092a83&target_code=9b09c7014498d3ea25c7ba34d49513c4

## **Getting Started**

### **Prerequisites**

Before you can run the API, you will need to have the following installed:

- Node.js(v14 or later)

- Mongodb atlas

### **Installing**

Clone the repository to your local machine.

In the root directory, create a .env file and add the
following environment variables:

1. Clone the repository to your local machine.
2. Install the required dependencies with npm install
3. In the root directory, create a **`.env`** file based on the **`.env.example`** file, and update the values as needed with the following variables

- MONGO_DB= **`mongodb url`**
- PORT= **`specified number`**
- JWT_SECRET= **`jwt secret`**
- NODE_ENV= **`stage of the project`**

4. Run  **`npm install`**  to install the required packages.
5. The API server will start running on http://localhost:3000. You can now send HTTP requests to the API endpoints.

## **Running**

To start the API, **`run npm start dev`**.

## **API Documentation**

To generate API documentation using Postman, you can utilize the built-in feature called Postman Documentation. Here's a step-by-step guide on how to create API documentation using Postman:

## **Base_Url**

[BASE_URL](https://cut-session-2t7b.onrender.com/api/)

### **User Authentication**

- POST /register/users: `Register a new user.`
- POST /register/merchants: `Register a new merchant for studio.`
- POST /sign-in: `Sign in users or merchants.`

### **Schedule**

- POST /studios/{merchantId}: `Create studio sessions.`
- GET /studios/{merchantId}: `Fetch studio sessions.`
- POST /bookings: `Book a studio session.`
- GET /bookings?limit=3&offset=1


## **Built With**

- @types/bcrypt
- @types/compression
- @types/cors
- @types/joi
- @types/morgan
- dotenv
- @types/express
- express-pino-logger
- express-paginate
- express-rate-limit
- express-validator
- @types/jsonwebtoken
- @types/mongoose
- tsc-watch
- mongoose-unique-validator

