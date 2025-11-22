Welcome to ShopNAO - a simple amazon-style shopping interface. Our react-based frontend populates itself using your mongodb! 

To use:

cd to backend, create a .env file and fill in with this format:

--------------------------------------------------------------------------------

# Must replace <user>, <password>, and <link> with your MongoDB Atlas details.
MONGO_URI="mongodb+srv://<user>:<password><link>
PORT=<choose a port>

--------------------------------------------------------------------------------

With this setup, when cd'd into the backend, run npm install and npm start to get the backend running.
Then cd to the front end, run npm install, run  npm start to start our react frontend locally.

With this, you have a working shopping interface! Populate your database with users and products as much as you'd like! 
