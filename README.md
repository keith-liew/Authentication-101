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
- This branch is create via passport-oauth strategy
- User are allow to use their google or facebook account to login to the system


## Technologies Used
- dotenv: ^16.0.3,
- ejs: ^3.1.8,
- express: ^4.18.1,
- express-session: ^1.17.3,
- mongoose: ^6.6.5,
- passport: ^0.6.0,
- passport-facebook: ^3.0.0,
- passport-google-oauth20: ^2.0.0,
- passport-local: ^1.0.0,
- passport-local-mongoose: ^7.1.2

## Features
- Create, Signin with JWT and logout an account


## Screenshots

- Homepage
![Homepage](/public/images/homepage.PNG)

- Register Page
![registerPage](/public/images/registerPage.PNG)

- Login Page
![loginPage](/public/images/loginPage.PNG)

- Google Oauth Page
![googleOauthPage](/public/images/googleOauthPage.png)

- Facebook Oauth Page
![facebookOauthPage](/public/images/facebookOauthPage.png)

- Secrets Page
![secretsPage](/public/images/secretsPage.PNG)


## Setup
- Project environment:
    - Node.js installed.
    - MongoDB Shell installed.
- Cloud Database environment (Optional):
    - Create a mongoDB Atlas account
- Secret string in _.env_ file
    - Create a random string as a **SECRET** variable in _.env_ file
- OAuth Settings
    - Login and create an app project in [Google Cloud](https://cloud.google.com/)
        1. Open the navigation bar and look for APIs and Services
        1. Setup the OAuth consent screen accordingly
        1. Only then create credentials
            - Insert Authorized JavaScript origins with `http://localhost:3000`
            - Insert Authorized redirect URIs with `http://localhost:3000/auth/google/secrets`
        1. Obtain the client-id and client-secret
        1. Save the information into _.env_ file as **GOOGLE_CLIENT_ID** and **GOOGLE_CLIENT_SECRET** variables
        - For more detailed documentation, please visit [Passport.js](https://www.passportjs.org/packages/passport-google-oauth20/)
    - Create an app in [Meta Developers](https://developers.facebook.com/?no_redirect=1) website
        1. Login account and then create a new app in "My App" section
        1. Open your app project folder
        1. Obtain the App-id and App-secret in "Settings -> Basic" section
        1. Insert Share Redirect Domain Allow List with `http://localhost:3000/auth/facebook/secrets`
        1. Save the information into .env file as **FACEBOOK_APP_ID** and **FACEBOOK_APP_SECRET**
        - For more detailed documentation, please visit [Passport.js](https://www.passportjs.org/packages/passport-facebook/)


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
- Concept of Oauth
- Intergrading local-mongoose strategy and oauth strategy all together
- Implement 3 different strategy
```javascript
//strategy from passport-local-mongoose
passport.use(User.createStrategy());
//strategy from passport-google-oauth20
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_CALLBACK_URL,
},(accessToken, refreshToken, profile, cb) => {
    //populate data
}))
//strategy from passport-facebook
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/secrets",
    profileFields: ["email"]
},(accessToken, refreshToken, profile, cb) => {
    //populate data
}))
```
- Use passport-local-mongoose strategy, session serialize and deserialize setting
```javascript
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
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
- Implement passport-local-mongoose, google-oauth20 and facebook strategy to the system
```javascript
MongoDB User Document
  {
    _id: ObjectId("63453b1279e060c821106afc"),
    username: 'something@gmail.com',
    secrets: [],
    googleId: '****1033791883423****',
    __v: 8
  },
  {
    _id: ObjectId("63454f34ed3d24d42747be2c"),
    username: 'final-testuser@email.com',
    secrets: [],
    salt: '6f5d32e5cd1d589ab6fcd364fc10ab290bae1f****************',
    hash: 'd863d5c2a400950129a9f6de5ccc2bf56f1a7******************',
    __v: 10
  },
```

## Acknowledgements
- This project was inspired by Angela Yu.
- This project was based on [this course](https://www.udemy.com/course/the-complete-web-development-bootcamp/) on Udemy.
- This project was inspired by Zach Gollwitzer.
- This project was based on [this tutorial](https://dev.to/zachgoll/the-ultimate-guide-to-passport-js-k2l) on his DEV blog.
