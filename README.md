# Authentication-101
> A simple online secret whisper website implemented certain authentication method. 
> Live demo [_here_](https://secret-authentication.onrender.com). 


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
* [Postscript](#p.s.)
* [Table](#table)


## General Information
- A simple express web server that store secrets
- User are able to read anonymous' secret and post their secret anonymously
- The purpose of this project is to learn and try to implement some sort of authentication methods into a project
- Different level of authentications are practiced and splited it into different branches


## Technologies Used
- connect-mongo: ^4.6.0,
- dotenv: ^16.0.3,
- ejs: ^3.1.8,
- express: ^4.18.1,
- express-session: ^1.17.3,
- method-override: ^3.0.0,
- mongoose: ^6.6.5,
- passport: ^0.6.0,
- passport-facebook: ^3.0.0,
- passport-google-oauth20: ^2.0.0,
- passport-local-mongoose: ^7.1.2

## Features
- Store user's secret and publish it anonymously
- User may revise and delete the secret they published previously
- Oauth implementation, create and signup an account or via google or facebook
- A delete account function is added for those who is not comfortable with sharing their email addresses.

## Screenshots

- Homepage
![Homepage](/public/images/homepage.PNG)

- Register Page
![registerPage](/public/images/registerPage.PNG)

- Login Page
![loginPage](/public/images/loginPage.PNG)

- Google Oauth Page
![googleOauthPage](/public/images/googleOauthPage.PNG)

- Facebook Oauth Page
![facebookOauthPage](/public/images/facebookOauthPage.PNG)

- Secrets Page
![secretsPage](/public/images/secretsPage.PNG)

- Secrets Page(Oauth User)
![secretsPage(oauthUser)](/public/images/secretsPage(Oauth%20User).PNG)

- Submit Page
![submitPage](/public/images/submitPage.PNG)

- Atlas Database Documents
![atlasdbDocuments](/public/images/atlasdbDocuments.PNG)

- Atlas Database Sessions
![atlasdbSessions](/public/images/atlasdbSessions.PNG)

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
- Understand the concept of session, cookies, and Oauth
- Implement the passport to create a session to a user
- Knowledge of verifying user, serialize and deserialize a cookie via passport package
- Implement passport-local-mongoose package to eliminate the need of hashing and salting the user information manually
- Implement the passport google and facebook oauth library
- Authenticate user from google and facebook.


## Acknowledgements
- This project was inspired by Angela Yu.
- This project was based on [this course](https://www.udemy.com/course/the-complete-web-development-bootcamp/) on Udemy.
- Huge credit to [Zach Gollwitzer](https://github.com/zachgoll) who explained authentication methods(Session-based and JWT-based authentication) and how it works in details.
- This project was also based on [this tutorial](https://dev.to/zachgoll/the-ultimate-guide-to-passport-js-k2l) on DEV

## P.S.
- Facebook redirect url from the demo is not available to the public.
- It is working fine in local environment, but not in hosting site
- Because Meta is blocking the access from public unless the App Advance Access setting is fullfilled

### Table
| Branches               | Username + Password | Database Encryption | Password Hashing | Session | JWT | Oauth | 
| ---------------------- | ------------------- | ---------- | ------- | ------- | --- | ----- |
| authentication-level-1 | :heavy_check_mark:  |
| authentication-level-2 | :heavy_check_mark:  |:heavy_check_mark:|
| authentication-level-3 | :heavy_check_mark:  | | :heavy_check_mark:|
| authentication-level-3-bcrypt | :heavy_check_mark: | | :heavy_check_mark:
| authentication-level-3-crypto | :heavy_check_mark: | | :heavy_check_mark:
| authentication-level-4-local-mongoose | :heavy_check_mark: | | :heavy_check_mark: | :heavy_check_mark:
| authentication-level-4-local-strategy | :heavy_check_mark:| | :heavy_check_mark: | :heavy_check_mark:
| authentication-level-5-jwt | :heavy_check_mark: | | :heavy_check_mark: | | :heavy_check_mark:
| authentication-level-6-oauth | :heavy_check_mark: | | :heavy_check_mark: |  :heavy_check_mark: | | :heavy_check_mark:
| master                 | :heavy_check_mark: | | :heavy_check_mark: |  :heavy_check_mark: | | :heavy_check_mark: