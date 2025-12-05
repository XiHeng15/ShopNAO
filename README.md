Welcome to ShopNAO - a simple amazon-style shopping interface. Our react-based frontend populates itself using your mongodb! 

Made by: WonUpped, XiHeng15, definitelynotcris, PlantEnjoyr, AmazingZeop, kozmazter

Modules used:

    "axios": "^1.13.2",
    "bcrypt": "^6.0.0",
    "body-parser": "^2.2.1",
    "cors": "^2.8.5",
    "dotenv": "^17.2.3",
    "express": "^5.1.0",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.20.1",
    "multer": "^2.0.2",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-router-dom": "^7.9.4",
    "react-select": "^5.10.2",
    "react-scripts": "^5.0.1",
    "stripe": "^20.0.0"
    "path": "^0.12.7"
    "web-vitals": "^2.1.4"

To use:

cd to backend, create a .env file and fill in with this format:

--------------------------------------------------------------------------------

# Must replace (user), (password), and (link) with your MongoDB Atlas details.

MONGO_URL="mongodb+srv://(user):(password)(link)
PORT=(choose a port)

--------------------------------------------------------------------------------

With this setup, when cd'd into the backend, run npm install and npm start to get the backend running.
Then cd to the front end, run npm install, run  npm start to start our react frontend locally.

With this, you have a working shopping interface! Populate your database with users and products as much as you'd like! 

Project Future Backlog:

    Front End: 

	    - Home Page	        Product highlights
		- Carousel			Sidescrolling list of products grouped in categories

    Back End:


	Miscellaneous

		- Look into hosting the website, if we can (makes demonstration easier)
		- 

