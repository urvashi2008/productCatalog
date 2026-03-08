const mongoose = require("mongoose");
const Product = require("./models/Product"); // your Product schema

const uri = "mongodb+srv://24bai70246_db_user:7vltvPpfTYMps1XN@cluster0.dgbyefh.mongodb.net/productDB?retryWrites=true&w=majority";

mongoose.connect(uri)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("Connection Error:", err));

async function run() {
  const product = new Product({
    name: "Premium Headphones",
    category: "Electronics",
    variants: [
      { sku: "HP-BL-001", color: "Black", price: 199.99, stock: 15 },
      { sku: "HP-WH-001", color: "White", price: 209.99, stock: 8 }
    ],
    reviews: [
      { userId: new mongoose.Types.ObjectId(), rating: 5, comment: "Excellent sound quality" }
    ]
  });

  await product.save(); // this actually creates the database and collection
  console.log("Product Saved");
}

run();