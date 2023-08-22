const express = require("express");
const app = express();
const port = 8000;
const {
  largerCatechism,
  largerCatechismWithScripture,
} = require("./data/westminster/catechisms/larger/");
const { scriptureIndex } = require("./data/scripture_index/bible-dictionary");

// Serve the static files (HTML, CSS, JS) from the public directory
app.use(express.static("public"));

app.get("/larger_catechism/:withScripture", (req, res) => {
  const includeScripture = req.params?.withScripture;
  res.json({
    data: includeScripture
      ? [...largerCatechismWithScripture]
      : [...largerCatechism],
  });
});
app.get("/larger_catechism/:withScripture/:questionId", (req, res) => {
  const { withScripture, questionId } = req.params;
  const selectedArray =
    withScripture === "true"
      ? [...largerCatechismWithScripture]
      : [...largerCatechism];
  res.json({
    data: selectedArray[questionId - 1],
  });
});
app.get("/scripture_index", (req, res) => {
  res.json({
    data: { ...scriptureIndex },
  });
});
app.get("/scripture_index/:bibleBook", (req, res) => {
  const { bibleBook } = req.params;
  res.json({
    data: { ...scriptureIndex }[bibleBook],
  });
});
app.get("/check", (req, res) => {
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

app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);
