const {
  createOutputOfFormattedArray,
  removeLeadingSpace,
} = require("../utilities/formatting");

const fs = require("fs");

// Read the input file
const inputFile = "data/raw_text/westminsterConfession.txt";
const numRegEx = /^\d+$/;
const letterRegEx = /[a-z]/;

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
      title: chapterTitle
        .split(/^CHAPTER \d+\.\s(.+)$/)
        .filter((item) => item !== "")[0],
      paragraphs: [],
    };

    let paragraphNum = 0;
    let currentParagraph;
    // Process each line in the section
    for (let i = 1; i < sectionData.length; i++) {
      const line = sectionData[i];
      if (line.startsWith("-----------------  PASSAGE  -----------------")) {
        if (paragraphNum > 0) {
          sectionObj.paragraphs.push(currentParagraph);
        }
        paragraphNum += 1;
        currentParagraph = {
          id: paragraphNum,
          passage: "",
          proofTexts: [],
        };
      } else if (numRegEx.test(line[0])) {
        if (line[1] === "0") {
          currentParagraph.passage = line
            .slice(4)
            .split(/\*([a-z])\*/g)
            .filter(
              (match) => match.trim() !== "" && match.trim().length !== 1
            );
        } else {
          currentParagraph.passage = line
            .slice(3)
            .split(/\*([a-z])\*/g)
            .filter(
              (match) => match.trim() !== "" && match.trim().length !== 1
            );
        }
      } else if (letterRegEx.test(line[0])) {
        if (line !== "") {
          currentParagraph.proofTexts.push(line.slice(3));
        }
      }
      if (i === sectionData.length - 1) {
        sectionObj.paragraphs.push(currentParagraph);
      }
    }

    // Add the section object to the result
    result.push(sectionObj);
  });

  // Output the result as JSON
  const outputFile = "data/formatting/output/theconfession.js";
  createOutputOfFormattedArray(result, outputFile);
});
