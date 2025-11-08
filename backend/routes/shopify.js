import express from "express";
import axios from "axios";

const router = express.Router();
const { SHOPIFY_STORE_DOMAIN, SHOPIFY_ACCESS_TOKEN } = process.env;

// Example: Get all products
router.get("/products", async (req, res) => {
  try {
    const response = await axios.get(
      `https://${SHOPIFY_STORE_DOMAIN}/admin/api/2024-07/products.json`,
      {
        headers: {
          "X-Shopify-Access-Token": SHOPIFY_ACCESS_TOKEN,
          "Content-Type": "application/json"
        },
      }
    );
    res.json(response.data.products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Example: Create a new product
router.post("/products", async (req, res) => {
  try {
    const { title, body_html, vendor, product_type } = req.body;
    const response = await axios.post(
      `https://${SHOPIFY_STORE_DOMAIN}/admin/api/2024-07/products.json`,
      { product: { title, body_html, vendor, product_type } },
      {
        headers: {
          "X-Shopify-Access-Token": SHOPIFY_ACCESS_TOKEN,
          "Content-Type": "application/json"
        },
      }
    );
    res.json(response.data.product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;