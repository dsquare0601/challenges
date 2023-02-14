const router = require("express").Router();
const controller = require("../controllers/products");
const { getProduct, addProduct, updateProduct } = controller;

router.get("/", getProduct);
router.patch("/:id", updateProduct);
router.post("/", addProduct);
router.put("/:id", (req, res) => {
  res.status(405).send();
});
router.delete("/:id", (req, res) => {
  res.status(405).send();
});

module.exports = router;
