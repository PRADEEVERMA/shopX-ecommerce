import Product from "../models/Product.js";

const getProducts = async (req, res) => {
  const { search, category } = req.query;
  const filter = {};

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { brand: { $regex: search, $options: "i" } },
    ];
  }

  if (category && category !== "All") {
    filter.category = category;
  }

  const products = await Product.find(filter);

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