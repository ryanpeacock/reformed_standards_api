const express = require("express");
const router = express.Router();
const { scriptureIndex } = require("../../data/scripture_index");

router.get("/", (req, res) => {
  res.json({
    data: { ...scriptureIndex },
  });
});

module.exports = router;
