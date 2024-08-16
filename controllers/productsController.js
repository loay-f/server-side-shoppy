const Product = require("../models/product");

const getProducts = async (req, res, next) => {
  const products = await Product.find();
  try {
    res.status(200).json(products);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving products.",
    });
  }
};

const addProduct = async (req, res, next) => {
  const { title, description, price, stock, category, colors, size, imageUrl } =
    req.body;
  try {
    const product = new Product({
      title: title,
      description: description,
      price: price,
      stock: stock,
      category: category,
      colors: colors,
      size: size,
      imageUrl: imageUrl,
    });
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getOneProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while retrieving products.",
    });
  }
};

const deleteProduct = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await Product.findByIdAndDelete(id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const updateData = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { new: true, runValidators: true }
    );
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getProducts,
  getOneProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
