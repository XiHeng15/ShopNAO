require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");
const placeholder = "/uploads/placeholder.jpg";


async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to ShopNAO!!!");

    //Optional - clears existing products (comment out if you don't want to delete existing)
    await Product.deleteMany({});

    //Add placeholder products
    const placeholders = [
      {
        id: 0,
        name: "Hammer",
        message: "Hammer",
        price: 10,
        img: placeholder,

      },
      {
        id: 1,
        name: "Cooler Hammer",
        message: "Cooler Hammer",
        price: 8,
        img: placeholder,

      },
      {
        id: 2,
        name: "Coolest Hammer",
        message: "Coolest Hammer",
        price: 12,
        img: placeholder,

      },
            {
        id: 3,
        name: "Coolester Hammer",
        message: "Coolester Hammer",
        price: 15,
        img: placeholder,

      },
      {
        id: 4,
        name: "Coolestest Hammer",
        message: "Coolestest Hammer",
        price: 20,
        img: placeholder,

      },
      {
        id: 5,
        name: "Coolestester Hammer",
        message: "Coolestester Hammer",
        price: 25,
        img: placeholder,

      }
    ];

    await Product.insertMany(placeholders);
    console.log("Placeholder products added!");
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.disconnect();
  }
}

seed();
