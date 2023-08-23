const { westminsterLargerCatechism } = require("../data/formatting/input");
const {
  formattedArray,
} = require("../data/formatting/output/shorterCatechism");
const {
  convertAnswerStringToArray,
  convertStringsToArraysInProofTexts,
  convertProofTextVersesWithNoBook,
  convertProofTextStringToObject,
  convertBibleBookToFullName,
  createOutputOfFormattedArray,
  findAnswerAndProofTextLengthMismatch,
  findUniqueNamesForBibleBooks,
} = require("../utilities/formatting");

// 1. Convert answer string into an array of strings
let conversionRoundOne = convertAnswerStringToArray(formattedArray);
conversionRoundOne = conversionRoundOne.map((item) => {
  if (item?.answer) {
    return {
      ...item,
      answer: item.answer.filter((item) => item.trim() !== ""),
    };
  }
  return item;
});
console.log(conversionRoundOne[0]);

// 2. Convert strings in proofTexts array to be arrays from seperating ; character
let conversionRoundTwo = convertStringsToArraysInProofTexts(conversionRoundOne);

// 3. Map through arrays in proofTexts array to find strings with no letters and add the book name from the previous string to the string
let conversionRoundThree = convertProofTextVersesWithNoBook(conversionRoundTwo);

// 4. Convert the strings in the arrays of the proofTexts array to be objects with fields: book, verse, and text
let conversionRoundFour = convertProofTextStringToObject(conversionRoundThree);
// let roundFive = findUniqueNamesForBibleBooks(conversionRoundFour);
// 5. Convert the bible book abbreviations in the book field to the full book name
let conversionRoundFive = convertBibleBookToFullName(conversionRoundFour);

// 6. Output Reformatted Array to new File
const newFilePath = "data/formatting/output/newShort2.js";
createOutputOfFormattedArray(conversionRoundFive, newFilePath);
findAnswerAndProofTextLengthMismatch(conversionRoundFive);
