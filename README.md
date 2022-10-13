# Authentication-101
> A simple online secret whisper website implemented certain authentication method. 


## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Screenshots](#screenshots)
* [Setup](#setup)
* [Usage](#usage)
* [Project Status](#project-status)
* [Lesson Learned](#lesson-learned)
* [Acknowledgements](#acknowledgements)


## General Information
- An incomplete simple express web server to store secrets
- The purpose of this project is to learn and try to implement some sort of authentications into a project
- This branch is create JsonWebToken for a user via passport


## Technologies Used
- cookie-parser: ^1.4.6,
- dotenv: ^16.0.3,
- ejs: ^3.1.8,
- express: ^4.18.1,
- jsonwebtoken: ^8.5.1,
- mongoose: ^6.6.5,
- passport: ^0.6.0,
- passport-jwt: ^4.0.0

## Features
- Create, Signin with JWT and logout an account


## Screenshots

- Homepage
![Homepage](/public/images/homepage.PNG)

- Register Page
![registerPage](/public/images/registerPage.PNG)

- Login Page
![loginPage](/public/images/loginPage.PNG)

- Secrets Page
![secretsPage](/public/images/secretsPage.PNG)


## Setup
- Project environment:
    - Node.js installed.
    - MongoDB Shell installed.
- Cloud Database environment (Optional):
    - Create a mongoDB Atlas account

## Usage
- On project terminal
    - install dependencies `npm install`
    - start the app `npm app.js`
- On Mongodb Shell
    - start the database server `mongosh`
- Or MongoDB Atlas (Optional):
    - Connect to your database via mongoose with the URI of your database (remember to change the information of username,password,clustername and password accordingly)
    - You should be able to get a customized URI from your account
    - For more detailed information and documentation, please visit [mongoDB doc](https://www.mongodb.com/docs/atlas/) website
```javascript
mongoose.connect("mongodb+srv://<username>:<password>@<clustername>.mongodb.net/<databasename>?w=majority");
```

## Project Status
Project is: _complete_


## Lesson Learned
- Create a simple login page via MongoDB
- Concept of Json Web Token
- The difference between JWT and session
- Create and use JWT strategy to handle token
```javascript
passport.use(strategy);
```
- Issue a signed JWToken
```javascript
//sign with payload, privateKey, {option of expires date and algorithm}
const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, { expiresIn: expiresIn, algorithm: "RS256" });
```
- Verify user's JWToken
```javascript
 passport.authenticate("jwt", { session: false })
```

- Implement custom passport local strategy to hash user password before saving into database
```javascript
MongoDB User Document
  {
    _id: ObjectId("6343a479536d609fab13092d"),
    username: 'jwt-testuser@email.com',
    secrets: [],
    salt: 'ce9a5e730ffec89d3cb6776f07d68be037ce7c2f86f7a39e3...............',
    hash: 'be22258c3c693e5a05b49bcbf2cd7d834cf6adb604d762fc1...............',
    __v: 0
  },
```

## Acknowledgements
- This project was inspired by Angela Yu.
- This project was based on [this course](https://www.udemy.com/course/the-complete-web-development-bootcamp/) on Udemy.
- This project was inspired by Zach Gollwitzer.
- This project was based on [this tutorial](https://dev.to/zachgoll/the-ultimate-guide-to-passport-js-k2l) on his DEV blog.
