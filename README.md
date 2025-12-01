Welcome to ShopNAO - a simple amazon-style shopping interface. Our react-based frontend populates itself using your mongodb! 

Made by: WonUpped, XiHeng15, definitelynotcris, PlantEnjoyr, AmazingZeop, kozmazter

Modules used:

    - express
    - react
    - JWT
    - bcrypt
    - stripe
    - npm
    - node
    - mongoose
    - cors
    - multer

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

Project Backlog:

    Front End:

	    - Home Page	        Product highlights, page summary
		- Carousel			Sidescrolling list of products grouped in categories
	    - User Dashboard	Tracks orders
		- Checkout Page
		- Adjust .css files for a cleaner appearance 

    Back End:
        
        - Checkout	        Shopping cart + Stripe checkout, backend
							Order model
							Order Route - Add order (route)
										- Display order route

							Checkout Route
							Integrate Stripe API
							Develop a Webhook?
							Ensure Payment Encryption
							Sign up for Stripe Development account 
							(dont worry about saving user info)


	Miscellaneous

		- Look into hosting the website, if we can (makes demonstration easier)
		- 

