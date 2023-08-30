const {
  createOutputOfFormattedArray,
  removeLeadingSpace,
} = require("../utilities/formatting");

const fs = require("fs");

// Read the input file
const inputFile = "data/raw_text/heidelbergCatechism.txt";
const numRegEx = /^\d+$/;
const letterRegEx = /[A-Z]/;

fs.readFile(inputFile, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }

  // Split the text into sections based on 'SECTION'
  const sections = data
    .split(
      "-----------------------------------  SECTION  -----------------------------------\n"
    )
    .filter((section) => section.trim() !== "");

  // Initialize an array to store the final JSON objects
  const result = [];
  // Process each section
  sections.forEach((section, sectionIndex) => {
    const sectionData = section.split("\n");
    const chapterTitle = sectionData[0].trim();

    // Initialize an object for the current section
    const sectionObj = {
      id: sectionIndex + 1,
      question: chapterTitle
        .split(/^Question \d+\.\s(.+)$/)
        .filter((item) => item !== "")[0],
      answer: "",
      proofTexts: "",
    };

    // Process each line in the section
    for (let i = 1; i < sectionData.length; i++) {
      const line = sectionData[i];
      if (line.startsWith("----------------  ANSWER  ----------------")) {
      } else if (letterRegEx.test(line[0])) {
        sectionObj.answer = line;
      } else if (line.startsWith("(")) {
        sectionObj.proofTexts = line;
      }
    }

    // Add the section object to the result
    result.push(sectionObj);
  });

  // Output the result as JSON
  const outputFile = "data/formatting/output/heidelberg.js";
  createOutputOfFormattedArray(result, outputFile);
});
