const express = require("express");
const router = express.Router();
const {
  confessionOfFaith,
  confessionOfFaithWithScripture,
} = require("../../data/standards/westminster/");

router.get("/:withScripture", (req, res) => {
  const { withScripture } = req.params;
  res.json({
    data:
      withScripture === "true"
        ? [...confessionOfFaithWithScripture]
        : [...confessionOfFaith],
  });
});
router.get("/:withScripture/:chapterId", (req, res) => {
  const { withScripture, chapterId } = req.params;
  const selectedArray =
    withScripture === "true"
      ? [...confessionOfFaithWithScripture]
      : [...confessionOfFaith];
  res.json({
    data: selectedArray[chapterId - 1],
  });
});

router.get("/check/check/check", (req, res) => {
  let checkArray = [];
  confessionOfFaith.map((item) => {
    item.paragraphs.map((i) => {
      if (i.proofTexts) {
        if (i.proofTexts.length !== i.passage.length) {
          checkArray.push(`Chapter ${item.id} - Paragraph ${i.id}`);
        }
      }
    });
  });
  res.json({
    badParagraphs: checkArray,
  });
});

module.exports = router;
