const express = require("express");
const router = express.Router();
const { childrensCatechism } = require("../../data/standards/childrens");

router.get("/", (req, res) => {
  res.json({
    data: [...childrensCatechism],
  });
});
router.get("/:questionId", (req, res) => {
  const { questionId } = req.params;
  res.json({
    data: childrensCatechism[questionId - 1],
  });
});

module.exports = router;
