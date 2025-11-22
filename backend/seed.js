require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");
const placeholder = "data:image/jpeg;base64,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"

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
