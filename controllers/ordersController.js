const Order = require("../models/orders");
const Cart = require("../models/cart");

const createOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.userId }).populate(
      "products.product"
    );
    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const products = cart.products.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
    }));

    const totalPrice = cart.products.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );

    const order = new Order({
      user: req.userId,
      products,
      totalPrice,
    });

    await order.save();

    // Clear the cart
    await Cart.findOneAndDelete({ user: req.userId });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      console.log(order)
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId });

    if (orders.length === 0) {
      res.status(404).json("no orders");
    } else {
      res.json(orders);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createOrder,
  getOrder,
  getUserOrders,
};
