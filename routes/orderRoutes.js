const express = require("express");
const router = express.Router();
const orderController = require("../controllers/ordersController");
const isAuth = require("../helpers/jwt");

router.get("/orders/:id", isAuth, orderController.getOrder);
router.get("/user-orders", isAuth, orderController.getUserOrders);
router.post("/create-order", isAuth, orderController.createOrder);

module.exports = router;
