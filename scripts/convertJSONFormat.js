const { originalFormat } = require("../data/originalFormat");
const {
  convertAnswerStringToArray,
  convertStringsToArraysInProofTexts,
  convertProofTextVersesWithNoBook,
  convertProofTextStringToObject,
  convertBibleBookToFullName,
  createOutputOfFormattedArray,
  findAnswerAndProofTextLengthMismatch,
} = require("../utilities/formatting");

// 1. Convert answer string into an array of strings
let conversionRoundOne = convertAnswerStringToArray(originalFormat);

// 2. Convert strings in proofTexts array to be arrays from seperating ; character
let conversionRoundTwo = convertStringsToArraysInProofTexts(conversionRoundOne);

// 3. Map through arrays in proofTexts array to find strings with no letters and add the book name from the previous string to the string
let conversionRoundThree = convertProofTextVersesWithNoBook(conversionRoundTwo);

// 4. Convert the strings in the arrays of the proofTexts array to be objects with fields: book, verse, and text
let conversionRoundFour = convertProofTextStringToObject(conversionRoundThree);

// 5. Convert the bible book abbreviations in the book field to the full book name
let conversionRoundFive = convertBibleBookToFullName(conversionRoundFour);

// 6. Output Reformatted Array to new File
const newFilePath = "data/output/new-formatted-array.js";
createOutputOfFormattedArray(conversionRoundFive, newFilePath);
findAnswerAndProofTextLengthMismatch(conversionRoundFive);
