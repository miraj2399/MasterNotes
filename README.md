# MasterNotes

Masternotes allow students to collaborate and share notes for lecture sessions. It acts as a shared notebook for a whole class with plenty of default and customizable organizing features. A week before the final exam, you don't want to worry about what topics the professor went over in the third week of the semester - MasterNotes is here to help you with that!

## Get it running!

The backend of this project is built on Nodejs, Express, and MongoDB. To run the server locally-
* Clone the repository
```
git clone https://github.com/miraj2399/MasterNotes.git
```
* Navigate to the *server* folder
```
cd masternotes/server
```
* Create a .env file to provide a URL for the database, PORT number, and JWT_SECRET (to create and verify the auth token).


<pre>
.
└── masternotes/
    ├── server/
    │   └── .env
    └── client/
        └── .env
</pre>
<br>

here is how .env file should look like at server folder
```
DATABASE_URL = mongodb+srv://<YOUR SERVER URL>

PORT = 4000

JWT_SECRET=<YOUR SECRET (recommended to have at least 64 character)>
```
* Install all the package dependencies:<br>`npm install`
* Start the server:<br>`node index.js`
<br><br>
### Now lets get the frontend running
* navigate to client folder
* install the frontend package:
```
npm install
```
* expose react app to browser
```
npm start
```

The application should be running at port 3000 if port 3000 is not already in use.


#