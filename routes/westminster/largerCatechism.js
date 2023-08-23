const express = require("express");
const router = express.Router();
const {
  largerCatechism,
  largerCatechismWithScripture,
} = require("../../data/standards/westminster/");

router.get("/:withScripture", (req, res) => {
  const { withScripture } = req.params;
  res.json({
    data:
      withScripture === "true"
        ? [...largerCatechismWithScripture]
        : [...largerCatechism],
  });
});
router.get("/:withScripture/:questionId", (req, res) => {
  const { withScripture, questionId } = req.params;
  const selectedArray =
    withScripture === "true"
      ? [...largerCatechismWithScripture]
      : [...largerCatechism];
  res.json({
    data: selectedArray[questionId - 1],
  });
});

router.get("/check", (req, res) => {
  let checkArray = [];
  largerCatechism.map((item) => {
    if (item?.proofTexts) {
      if (item.answer.length !== item.proofTexts.length) {
        checkArray.push(`${item.id}`);
      }
    }
  });
  res.json({
    badQuestions: checkArray,
  });
});

module.exports = router;
