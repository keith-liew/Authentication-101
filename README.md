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
- This branch is simple password hashing via bcrypt package


## Technologies Used
- dotenv: ^16.0.3,
- ejs: ^3.1.8,
- express: ^4.18.1,
- mongoose: ^6.6.5,
- bcrypt: ^5.1.0


## Features
- Create, Signin and logout an account


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
- Implement bcrypt hashing to hash user password and generate salt
```javascript
bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(req.body.password, salt, function (err, hash) {
        // Store hash in your password DB.
    });
});
```
- Use bcrypt method to handle the data verification
```javascript
Verify Input Data
bcrypt.compare(password, user.hash, function (err, result) {
    //if err else continue with result
});

MongoDB User Document
  {
    _id: ObjectId("633fe7472cd429bb4a180b69"),
    username: 'testbcrypt@email.com',
    secrets: [],
    hash: '$2b$10$t42NV0D/oCv7nm.AAQUMR.SQIFhoQqfXyviuC5BhLFO/K7w.Q1Bn6',
    __v: 0
  },
```


## Acknowledgements
- This project was inspired by Angela Yu.
- This project was based on [this course](https://www.udemy.com/course/the-complete-web-development-bootcamp/) on Udemy.

