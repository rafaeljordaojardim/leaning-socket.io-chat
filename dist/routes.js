"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router = require("express").Router();
router.get("/", (req, res, next) => {
    res.render("chat");
});
exports.default = router;
