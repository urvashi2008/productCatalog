const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  comment: String
});

const variantSchema = new mongoose.Schema({
  sku: String,
  color: String,
  price: Number,
  stock: Number
});

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  variants: [variantSchema],
  reviews: [reviewSchema],
  avgRating: Number
});

// Index for faster search
productSchema.index({ name: 1 });
productSchema.index({ category: 1 });

// Stock update method
productSchema.methods.updateStock = function (sku, qty) {
  const variant = this.variants.find(v => v.sku === sku);

  if (variant) {
    variant.stock -= qty;
  }

  return this.save();
};

module.exports = mongoose.model("Product", productSchema);