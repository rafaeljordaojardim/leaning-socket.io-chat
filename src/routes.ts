const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.render("chat");
});

export default router;