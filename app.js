const mongoose = require("mongoose");
const Product = require("./models/Product");

mongoose.connect("mongodb://127.0.0.1:27017/productDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

async function run() {

  const product = new Product({
    name: "Premium Headphones",
    category: "Electronics",
    variants: [
      {
        sku: "HP-BL-001",
        color: "Black",
        price: 199.99,
        stock: 15
      },
      {
        sku: "HP-WH-001",
        color: "White",
        price: 209.99,
        stock: 8
      }
    ],
    reviews: [
      {
        userId: new mongoose.Types.ObjectId(),
        rating: 5,
        comment: "Excellent sound quality"
      }
    ]
  });

  await product.save();

  console.log("Product Saved");

  // Aggregation (Average Rating)

  const result = await Product.aggregate([
    { $unwind: "$reviews" },
    {
      $group: {
        _id: "$_id",
        avgRating: { $avg: "$reviews.rating" }
      }
    }
  ]);

  console.log("Average Rating:", result);

}

run();