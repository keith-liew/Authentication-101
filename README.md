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
- This branch is simple password encryption via mongoose-encryption package


## Technologies Used
- dotenv: ^16.0.3,
- ejs: ^3.1.8,
- express: ^4.18.1,
- mongoose: ^6.6.5,
- mongoose-encryption: ^2.1.2


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
- Implement mongoose-encryption as a model plugin
```javascript
userSchema.plugin(encrypt, {secret: process.env.SECRET, encryptedFields: ["password"]});
```
- Use mongoose-encryption plugin setting to handle the data encryption and decryption
```javascript
MongoDB User Document
  {
    _id: ObjectId("633fb27ada471bffa26e2470"),
    username: 'test2@email.com',
    secrets: [],
    _ct: Binary(Buffer.from("61f1a7a4a30cf9a559c6d480ef87ab482a01208daaf2c68fb221dfc334b14cf683befc1ff2b5353538f842b6d8300837d8", "hex"), 0),
    _ac: Binary(Buffer.from("618c105d1bb06bfe47ff8676aa18affc44e74263d6049b5d40c094e05f188e34a95b225f6964222c225f6374225d", "hex"), 0),
    __v: 0
  },
```

## Acknowledgements
- This project was inspired by Angela Yu.
- This project was based on [this course](https://www.udemy.com/course/the-complete-web-development-bootcamp/) on Udemy.

