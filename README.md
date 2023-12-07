# MasterNotes

Masternotes allow students to collaborate and share notes for lecture sessions. It acts as a shared notebook for a whole class with plenty of default and customizable organizing features. A week before the final exam, you don't want to worry about what topics the professor went over in the third week of the semester - MasterNotes is here to help you with that!

## Documentation

The backend of this project is built on Nodejs, Express, and MongoDB. To run the server locally,
* Clone the repository
* Navigate to the *server* folder
* Create a .env file to provide a URL for the database, PORT number, and JWT_SECRET (to create and verify the auth token)
* Install all the package dependencies:<br>`npm install`
* Start the server:<br>`node index.js`


### Routes

<sup>POST</sup> **/users/login**<br>

<pre>
{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJdfbWFpbCI6Im1pcmFqQGdtYWlsLmNvbSIsInVzZXJJZCI6IjY1MWM2ZmM5ZDg3YmUyYWFkMzkzOWFiMCIsImlhdCI6MTY5NjUyMjYyOH0.M8twodlJIHniydf1ued5PIwTwemw_BBwQ0nIvHZZUfiI"}
</pre>
<sup>POST</sup> **/users/signup**<br>
<sup>POST</sup> **/users/authenticated**<br>
<br>
<sup>GET</sup>  **/groups**<br>
<sup>POST</sup> **/groups**<br>
<sup>GET </sup> **/groups/:id**<br>
<sup>POST</sup> **/invite**<br>
<sup>POST</sup> **/decline/:id**<br>
<sup>GET</sup> **/join/:id**<br>
<sup>GET</sup> **/leave/:id**<br>



