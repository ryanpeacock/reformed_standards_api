const express = require("express");
const router = express.Router();
const {
  shorterCatechism,
  shorterCatechismWithScripture,
} = require("../../data/standards/westminster/");

router.get("/:withScripture", (req, res) => {
  const { withScripture } = req.params;
  res.json({
    data:
      withScripture === "true"
        ? [...shorterCatechismWithScripture]
        : [...shorterCatechism],
  });
});
router.get("/:withScripture/:questionId", (req, res) => {
  const { withScripture, questionId } = req.params;
  const selectedArray =
    withScripture === "true"
      ? [...shorterCatechismWithScripture]
      : [...shorterCatechism];
  res.json({
    data: selectedArray[questionId - 1],
  });
});

router.get("/check", (req, res) => {
  let checkArray = [];
  shorterCatechism.map((item) => {
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
