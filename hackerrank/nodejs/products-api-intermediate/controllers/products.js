const Products = require("../models/products");

const getProduct = async (req, res) => {
  try {
    const data = await Products.findAll();
    res.status(200).send(data);
  } catch (error) {
    res.send(404);
  }
};

const addProduct = async (req, res) => {
  try {
    const body = req.body;

    body.isPublished = false;
    const createdData = await Products.create(body);

    res.status(201).send(createdData);
  } catch (error) {
    res.send(404);
  }
};

const updateProduct = async (req, res) => {
  try {
    const body = req.body,
      id = req.params.id || 0;
    const errorBody = [];

    const existingData = await Products.findByPk(id);

    if (!existingData) throw new Error("Invalid Id");

    if (body.isPublished && existingData.mrp !== existingData.price)
      errorBody.push("MRP should be less than equal to the Price");
    if (body.isPublished && existingData.stock === 0)
      errorBody.push("Stock count is 0");

    if (errorBody.length) throw { statusCode: 422, body: errorBody };

    await Products.update(body, {
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    if (error.statusCode)
      return res.status(422).send(error.body || error.message);
    res.status(405).send();
  }
};

module.exports = {
  getProduct,
  addProduct,
  updateProduct,
};
