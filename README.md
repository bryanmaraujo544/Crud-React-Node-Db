# Live Application

![MovieReviewGif](https://user-images.githubusercontent.com/62571814/131766751-4e3858cc-85bd-42ec-bc57-5851f9b2a68f.gif)



## 💻 How it Works

To enter in application the user needs to sign-in or sign-up. When the user is in, he can write, update and delete reviews.  
The user is able to update his profile informations, but only in each 5 days.  
The application has light and dark mode. Even when user left the application, his color mode preference is mainained.

## :hammer: How it Was Made

I've used React to build the application interface; NodeJs/ExpressJs to build the routes, authenticate users, and make connection to MySql database. For register and login process I've used jwt tokens and cookies to storage this token, wich contains the user's username, email and image url. The password of the user is been encrypted for a better security. 

### :mag_right: I've used the main HTTP methods:

- POST (to send the informations of the Frontend for the Backend and storage it in our database)
- GET (for Fronend get the informations of the Backend)
- PUT (for frontend update some information in Backend
- DELETE (for frontend send some information to backend delete)

## :hammer: Technologies and dependencies

- React Dom
- React-router
- React-router-dom
- Axios
- Node-sass
- Cors
- Mysql
- Express
- Nodemon

