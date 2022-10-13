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
- This branch is create session for a user via passport and custom local strategy


## Technologies Used
- dotenv: ^16.0.3,
- ejs: ^3.1.8,
- express: ^4.18.1,
- express-session: ^1.17.3,
- mongoose: ^6.6.5,
- passport: ^0.6.0,
- passport-local: ^1.0.0,

## Features
- Create, Signin with session and logout an account


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
- Secret string in .env file
    - Create a random string as a SECRET variable in .env file

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

- Create and use the custom passport-local strategy to handle data verification
```javascript
passport.use(new LocalStrategy(function (username, password, done) {
    //data verification
});
```
- Create custom session serialize and deserialize setting
```javascript
passport.serializeUser(function (user, done) {
    //serialize cookie data
});
passport.deserializeUser(function (username, done) {
    //deserialize cookie data and populate the user data as req.user
});
```
- Log user in and out
```javascript
req.login();
req.logout();
```
- Verify and issue user session
```javascript
 passport.authenticate("local")
```
- Authenticate user session
```javascript
req.isAuthenticated()
```
- Implement custom passport local strategy to hash user password before saving into database
```javascript
MongoDB User Document
  {
    _id: ObjectId("6342656fec72583876e8e8cb"),
    username: 'testlocal@email.com',
    secrets: [],
    hash: '26445d10c9f0df3b287a30540786ae4fcff966e3c475894638........',
    salt: '9c14efd98a8b32c7aea6d6466f8a5217170af69a0d4b6f374.........',
    __v: 0
  },
```

## Acknowledgements
- This project was inspired by Angela Yu.
- This project was based on [this course](https://www.udemy.com/course/the-complete-web-development-bootcamp/) on Udemy.
- This project was inspired by Zach Gollwitzer.
- This project was based on [this tutorial](https://dev.to/zachgoll/the-ultimate-guide-to-passport-js-k2l) on his DEV blog.
