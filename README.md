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
- This branch is simple password hashing via javascript crypto library


## Technologies Used
- dotenv: ^16.0.3,
- ejs: ^3.1.8,
- express: ^4.18.1,
- mongoose: ^6.6.5


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
- Build custom hashing to hash user password via crypto library
```javascript
const salt = crypto.randomBytes(32).toString("hex");
const hash = crypto.pbkdf2Sync(req.body.password, salt, 10000, 64, "sha512").toString("hex");

```
- Implement crypto library to hash user password before saving into database
```javascript
MongoDB User Document
  {
    _id: ObjectId("633ffc4f145e23d91359de5b"),
    username: 'testcrypto@email.com',
    secrets: [],
    hash: '91a950ef778c68ff8c42e8aac7625a9a5badb25cb3868ff13da2412351c0f4ecf00da808f736981e2829f2c46063f568330194fd565c60a81df1ffce4f1a040d',
    salt: '2c0f96378f2f82a162640203475a25111df327ba5dc410de19e1575eea1dad1c',
    __v: 0
  },
```

## Acknowledgements
- This project was inspired by Angela Yu.
- This project was based on [this course](https://www.udemy.com/course/the-complete-web-development-bootcamp/) on Udemy.
- This project was inspired by Zach Gollwitzer.
- This project was based on [this tutorial](https://dev.to/zachgoll/the-ultimate-guide-to-passport-js-k2l) on his DEV blog.

