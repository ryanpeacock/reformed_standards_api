const express = require("express");
const app = express();
const port = 8000;

// Serve the static files (HTML, CSS, JS) from the public directory
app.use(express.static("public"));

// Routes
app.use(
  "/westminster/larger_catechism/",
  require("./routes/westminster/largerCatechism")
);
app.use(
  "/westminster/shorter_catechism/",
  require("./routes/westminster/shorterCatechism")
);
app.use(
  "/westminster/confession/",
  require("./routes/westminster/confessionOfFaith")
);
app.use(
  "/three_forms/heidelberg_catechism/",
  require("./routes/threeForms/heidelbergCaechism")
);
app.use(
  "/children/childrens_catechism",
  require("./routes/childrens/childrensCatechism")
);
app.use("/scripture_index/", require("./routes/scriptureIndex/scriptureIndex"));

// Run Server
app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);
