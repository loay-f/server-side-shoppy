const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const isAuth = require("../helpers/jwt");

router.get("/cart", isAuth, cartController.getCart);
router.post("/add-to-cart", isAuth, cartController.addToCart);
router.post("/edit-cart", isAuth, cartController.updateCart);
router.post("/remove-from-cart", isAuth, cartController.removeFromCart);
router.delete("/clear-cart", isAuth, cartController.clearCart);

module.exports = router;
