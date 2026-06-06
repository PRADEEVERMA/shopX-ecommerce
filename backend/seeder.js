import dotenv from "dotenv";
import connectDB from "./config/db.js";
import User from "./models/User.js";
import Product from "./models/Product.js";

dotenv.config();

const sampleProducts = [
  {
    name: "Smart Watch Series 8",
    rating: 4.8,
    reviews: 128,
    price: 899.99,
    oldPrice: 1249.99,
    image: "watchImg",
    category: "Electronics",
    countInStock: 10,
    brand: "ShopX",
    description: "Modern smartwatch with fitness tracking and messaging.",
  },
  {
    name: "Men's Sports Shoes",
    rating: 4.6,
    reviews: 96,
    price: 259.99,
    oldPrice: 299.99,
    image: "shoesImg",
    category: "Fashion",
    countInStock: 18,
    brand: "ShopX",
    description: "Lightweight sports shoes for running and training.",
  },
  {
    name: "Canon EOS 2000D",
    rating: 4.9,
    reviews: 74,
    price: 14099.99,
    oldPrice: 18049.99,
    image: "cameraImg",
    category: "Electronics",
    countInStock: 8,
    brand: "Canon",
    description: "Compact DSLR camera for beginners and photography lovers.",
  },
  {
    name: "Women’s Handbag",
    rating: 4.7,
    reviews: 58,
    price: 139.99,
    oldPrice: 159.99,
    image: "bagImg",
    category: "Fashion",
    countInStock: 26,
    brand: "ShopX",
    description: "Stylish handbag with rich finish and premium details.",
  },
  {
    name: "Wireless Earbuds",
    rating: 4.5,
    reviews: 112,
    price: 899.99,
    oldPrice: 1129.99,
    image: "earbudsImg",
    category: "Electronics",
    countInStock: 14,
    brand: "ShopX",
    description: "Noise-cancelling wireless earbuds with long battery life.",
  },
  {
    name: "Headphones",
    rating: 4.7,
    reviews: 95,
    price: 1199.99,
    oldPrice: 1999.99,
    image: "headphonesImg",
    category: "Electronics",
    countInStock: 22,
    brand: "ShopX",
    description: "Premium sound quality headphones for work and play.",
  },
  {
    name: "Women Fashion Collection",
    rating: 4.9,
    reviews: 156,
    price: 129.99,
    oldPrice: 179.99,
    image: "fashionGirlImg",
    category: "Fashion",
    countInStock: 30,
    brand: "ShopX",
    description: "Curated fashion collection for women with trendy styles.",
  },
  {
    name: "Classic Sunglasses",
    rating: 4.6,
    reviews: 88,
    price: 149.99,
    oldPrice: 199.99,
    image: "sunglassesImg",
    category: "Fashion",
    countInStock: 16,
    brand: "ShopX",
    description: "UV-protected sunglasses with timeless style.",
  },
  {
    name: "Modern Sofa",
    rating: 4.8,
    reviews: 84,
    price: 1399.99,
    oldPrice: 2099.99,
    image: "sofaImg",
    category: "Home & Kitchen",
    countInStock: 5,
    brand: "ShopX",
    description: "Comfortable sofa with contemporary design.",
  },
  {
    name: "Wooden Chair",
    rating: 4.6,
    reviews: 67,
    price: 1099.99,
    oldPrice: 1599.99,
    image: "chairImg",
    category: "Home & Kitchen",
    countInStock: 14,
    brand: "ShopX",
    description: "Durable wooden chair with elegant finish.",
  },
  {
    name: "Decorative Lamp",
    rating: 4.7,
    reviews: 53,
    price: 299.99,
    oldPrice: 379.99,
    image: "lampImg",
    category: "Home & Kitchen",
    countInStock: 20,
    brand: "ShopX",
    description: "Stylish lamp to brighten up your home decor.",
  },
  {
    name: "Kitchen Essentials Set",
    rating: 4.9,
    reviews: 120,
    price: 149.99,
    oldPrice: 199.99,
    image: "kitchenImg",
    category: "Home & Kitchen",
    countInStock: 12,
    brand: "ShopX",
    description: "Complete kitchen starter set for everyday cooking.",
  },
];

const importData = async () => {
  try {
    await connectDB();
    await User.deleteMany();
    await Product.deleteMany();

    const adminUser = await User.create({
      name: "Admin User",
      email: "admin@shopx.com",
      password: "Admin@123",
      isAdmin: true,
    });

    const createdProducts = await Product.insertMany(sampleProducts);

    console.log("Data imported successfully");
    console.log("Admin user: admin@shopx.com / Admin@123");
    console.log("Products created:", createdProducts.length);
    process.exit();
  } catch (error) {
    console.error("Seeder error:", error);
    process.exit(1);
  }
};

importData();