var recipes = require("../recipes.json");
var router = require("express").Router();

router.get("/shopping-list", (req, res) => {
  try {
    const { ids } = req.query;
    if (!ids) {
      return res.status(400).send();
    }
    const foundIds = ids.split(",").map(Number);
    if (foundIds.some(isNaN)) {
      return res.status(404).send("NOT_FOUND");
    }
    const data = recipes.filter((recipe) => foundIds.includes(recipe.id));
    const ingredients = data.flatMap((recipe) => recipe.ingredients);
    res.status(200).send(ingredients);
  } catch (error) {
    return res.status(400).send();
  }
});
module.exports = router;
