const productsController = require("../controllers/productsController");
const express = require("express");
const isAuth = require("../helpers/jwt");

const router = express.Router();

router.get("/products", productsController.getProducts);
router.get("/products/:id", productsController.getOneProduct);

router.post("/add-product", isAuth, productsController.addProduct);
router.delete("/delete-product/:id", isAuth, productsController.deleteProduct);
router.patch("/edit-product/:id", isAuth, productsController.updateProduct);

module.exports = router;
