import Product from "../models/Product.js";
import { performance } from "node:perf_hooks";

const escapeRegex = (value) => String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const getProducts = async (req, res) => {
  const { search, category } = req.query;
  const filter = {};
  const startedAt = performance.now();

  if (search?.trim()) {
    const searchTerm = escapeRegex(search.trim());
    filter.$or = [
      { name: { $regex: searchTerm, $options: "i" } },
      { description: { $regex: searchTerm, $options: "i" } },
      { brand: { $regex: searchTerm, $options: "i" } },
      { category: { $regex: searchTerm, $options: "i" } },
    ];
  }

  if (category?.trim() && category !== "All") {
    filter.category = {
      $regex: `^${escapeRegex(category.trim())}$`,
      $options: "i",
    };
  }

  const products = await Product.find(filter)
    .select("name description price oldPrice image category brand countInStock rating reviews")
    .lean();
  const dbDuration = performance.now() - startedAt;

  res.set("Cache-Control", "public, max-age=60, stale-while-revalidate=300");
  res.set("Server-Timing", `db;dur=${dbDuration.toFixed(1)}`);
  res.json(products);
};

const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
};

const createProduct = async (req, res) => {
  const {
    name,
    price,
    category,
    description,
    image,
    brand,
    countInStock,
    oldPrice,
    rating,
    reviews,
  } = req.body;

  const product = new Product({
    name,
    price,
    category,
    description,
    image,
    brand,
    countInStock,
    oldPrice,
    rating,
    reviews,
  });

  const createdProduct = await product.save();

  res.status(201).json(createdProduct);
};

const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  product.name = req.body.name || product.name;
  product.price = req.body.price ?? product.price;
  product.category = req.body.category || product.category;
  product.description = req.body.description || product.description;
  product.image = req.body.image || product.image;
  product.brand = req.body.brand || product.brand;
  product.countInStock = req.body.countInStock ?? product.countInStock;
  product.oldPrice = req.body.oldPrice ?? product.oldPrice;
  product.rating = req.body.rating ?? product.rating;
  product.reviews = req.body.reviews ?? product.reviews;

  const updatedProduct = await product.save();

  res.json(updatedProduct);
};

const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  await product.remove();

  res.json({ message: "Product removed" });
};

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
