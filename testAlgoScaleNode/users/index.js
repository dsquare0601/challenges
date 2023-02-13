const { Router } = require("express");

module.exports = Router().post("/", (req, res) => {
  try {
    const { username = undefined, password = undefined } = req.body;

    if (!username || !password)
      throw new Error("Username and password both required to login.");

    if (username !== "user1" || password !== "pass1")
      throw new Error("Invalid login credentials");

    res.status(200).send({
      success: false,
      message: "User logged in successfully",
      data: {
        token: "retyiujhkbjvncxfdseretyruiyohlknbjvhcgyfxrtsrd",
      },
    });
  } catch (error) {
    res.status(401).send({ success: false, message: "Invalid login" });
  }
});
