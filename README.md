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

Requires a Stripe and MongoDBAtlas Account to run without modifications.

To use:

cd to backend, create a .env file and fill in with this format ():

--------------------------------------------------------------------------------

# Must replace (user), (password), and (link) with your MongoDB Atlas details.
# Must replace STRIPE_WEBHOOK_SECRET with the key you receive from Stripe.
# Must replace STRIPE_SECRET_KEY with the key you recieve from Stripe.

MONGO_URL="mongodb+srv://(user):(password)@(link)"
PORT=5000
JWT_SECRET=""
STRIPE_WEBHOOK_SECRET=""
STRIPE_SECRET_KEY=""

--------------------------------------------------------------------------------

TESTERS LOOKING TO USE OUR SEEDED EXAMPLE DATABASE JUST NEED TO RENAME THE .env.testing to .env THAT WE HAVE PROVIDED AND RUN STRIPE TO FILL IN THE STRIPE_WEBHOOK_SECRET VAR!!!

Install stripe-cli on your computer. When installed, run .\stripe.exe listen (Depending on your OS this will be different. On Linux/Unix once installed via a package manager just run stripe listen. On Windows you must open powershell and cd to the exact folder the stripe.exe is located and run .\stripe.exe listen). When prompted, make sure to login with the stripe account that uses the secret keys in your env.

Once logged in through the CLI, go to your .env and  place the STRIPE_WEBHOOK_SECRET key you recieve from the CLI. (Check your powershell/bash output)

    PS C:\Users\*redacted*\Downloads\stripe_1.33.0_windows_x86_64> .\stripe.exe listen
    > Ready! You are using Stripe API Version [2025-11-17.clover]. Your webhook signing secret is whsec_...................................... (^C to quit)


With this setup, when cd'd into the backend, run npm install and npm start to get the backend running.
Then cd to the front end, run npm install, run  npm start to start our react frontend locally.

With this, you have a working shopping interface! Populate your database with users and products as much as you'd like! (runs on localhost:3000 and localhost:5000, may need modification to work for your own usecase!)

Project Future Backlog:

    Front End: 

	    - Home Page	        Product highlights
		- Carousel			Sidescrolling list of products grouped in categories

    Back End:


	Miscellaneous

		- Look into hosting the website, if we can (makes demonstration easier)
		- 

