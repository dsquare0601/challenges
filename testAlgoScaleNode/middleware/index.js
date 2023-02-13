const DEMO_TOKEN = "retyiujhkbjvncxfdseretyruiyohlknbjvhcgyfxrtsrd";

module.exports = (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (DEMO_TOKEN !== token.split("Bearer ")[1])
      throw new Error("Unauthorized");

    next();
  } catch (error) {
    res.status(404).send({ success: false, message: "Unauthorized" });
  }
};
