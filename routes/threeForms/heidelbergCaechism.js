const express = require("express");
const router = express.Router();
const {
  heidelbergCatechism,
  heidelbergCatechismWithScripture,
} = require("../../data/standards/threeForms");

router.get("/:withScripture", (req, res) => {
  const { withScripture } = req.params;
  res.json({
    data:
      withScripture === "true"
        ? [...heidelbergCatechismWithScripture]
        : [...heidelbergCatechism],
  });
});
router.get("/:withScripture/:questionId", (req, res) => {
  const { withScripture, questionId } = req.params;
  const selectedArray =
    withScripture === "true"
      ? [...heidelbergCatechismWithScripture]
      : [...heidelbergCatechism];
  res.json({
    data: selectedArray[questionId - 1],
  });
});

router.get("/check/check/check", (req, res) => {
  let checkArray = [];
  heidelbergCatechism.map((item) => {
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
