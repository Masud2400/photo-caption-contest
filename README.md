# Photo Caption Contest App
This is a simple web-based photo caption contest app where users can log in, select photos, and submit captions for the photos they choose. The app stores the user data and captions in a PostgreSQL database, and the backend is built using Express.js.

## Features
* Sign up: Users can create an account with an email and password.

* Login: Users can log in using their email and password.

* Submit Captions: After logging in, users can select a photo and submit a caption for that photo.

* User Profiles: The app stores user-submitted captions in the database, linked to their email.

* Session Management: The app uses sessions to keep the user logged in across requests.

## Technologies Used
* Node.js: Backend runtime environment.

* Express.js: Web framework to handle routes and server logic.

* PostgreSQL: Relational database for storing user data and captions.

* bcryptjs: Password hashing library for secure authentication.

* express-session: Manages user sessions for maintaining login state.

* HTML & CSS: Frontend for user interaction and submitting captions.

## Example Workflow:
1. Sign up:
* Users can create an account with an email and password via the /sign-up route.

2. Login:
* Users can log in with their credentials using the /login route.

3. Submit Captions:
* Logged-in users can choose a photo and submit a caption using the /submit route. The caption will be saved in the database, associated with their email.

## License
This project is licensed under the MIT License 
