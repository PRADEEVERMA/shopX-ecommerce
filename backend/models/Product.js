import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a product name"],
      trim: true,
    },
    description: {
      type: String,
      default: "Premium quality product designed for modern lifestyle.",
    },
    price: {
      type: Number,
      required: [true, "Please provide a product price"],
      min: 0,
    },
    oldPrice: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      enum: ["Electronics", "Fashion", "Home & Kitchen", "Beauty & Health", "Sports"],
      default: "Electronics",
    },
    brand: {
      type: String,
      default: "ShopX Brand",
    },
    countInStock: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviews: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;