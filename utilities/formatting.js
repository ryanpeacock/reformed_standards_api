const fs = require("fs");

const bibleAbbreviationsToFullName = {
  "1 Cor.": "1 Corinthians",
  "1 John": "1 John",
  "2 Tim.": "2 Timothy",
  Acts: "Acts",
  "Acts.": "Acts",
  Amos: "Amos",
  "Col.": "Colossians",
  "Dan.": "Daniel",
  Deut: "Deuteronomy",
  "Deut.": "Deuteronomy",
  "Eccl.": "Ecclesiastes",
  "Eph.": "Ephesians",
  "Est.": "Esther",
  "Esth.": "Esther",
  "Exod.": "Exodus",
  "Ezek.": "Ezekiel",
  Ezra: "Ezra",
  "Gal.": "Galatians",
  "Gen.": "Genesis",
  "Hab.": "Habakkuk",
  "Heb.": "Hebrews",
  Hosea: "Hosea",
  "I Chr.": "1 Chronicles",
  "I Cor.": "1 Corinthians",
  "I John": "1 John",
  "I Kings": "1 Kings",
  "I Peter": "1 Peter",
  "I Sam.": "1 Samuel",
  "I Thess": "1 Thessalonians",
  "I Thess.": "1 Thessalonians",
  "I Tim.": "1 Timothy",
  "II Chr.": "2 Chronicles",
  "II Cor.": "2 Corinthians",
  "II John": "2 John",
  "II Kings": "2 Kings",
  "II Peter": "2 Peter",
  "II Sam.": "2 Samuel",
  "II Thess": "2 Thessalonians",
  "II Thess.": "2 Thessalonians",
  "II Tim.": "2 Timothy",
  "III John": "3 John",
  Isa: "Isaiah",
  "Isa .": "Isaiah",
  "Isa.": "Isaiah",
  James: "James",
  "Jer.": "Jeremiah",
  Job: "Job",
  "Job.": "Job",
  Joel: "Joel",
  John: "John",
  Jonah: "Jonah",
  "Josh.": "Joshua",
  Jude: "Jude",
  "Judg.": "Judges",
  "Lam.": "Lamentations",
  "Lev.": "Leviticus",
  Luke: "Luke",
  "Mal.": "Malachi",
  Mark: "Mark",
  Matt: "Matthew",
  "Matt.": "Matthew",
  "Mattt.": "Matthew",
  Micah: "Micah",
  "Neh.": "Nehemiah",
  "Num.": "Numbers",
  Phil: "Philippians",
  "Phil.": "Philippians",
  Prov: "Proverbs",
  "Prov.": "Proverbs",
  Psa: "Psalms",
  "Psa.": "Psalms",
  "Rev.": "Revelation",
  Rom: "Romans",
  "Rom.": "Romans",
  "Song of Sol.": "Song of Solomon",
  Titus: "Titus",
  "Titus.": "Titus",
  "Zech.": "Zechariah",
  "Zeph.": "Zephaniah",
};

const bibleAbbreviationsToFullNameShorter = {
  "1 Chron.": "1 Chronicles",
  "1 Cor": "1 Corinthians",
  "1 Cor.": "1 Corinthians",
  "1 John": "1 John",
  "1 Kings": "1 Kings",
  "1 Pet.": "1 Peter",
  "1 Sam.": "1 Samuel",
  "1 Thess.": "1 Thessalonians",
  "1 Tim.": "1 Timothy",
  "2 Chron.": "2 Chronicles",
  "2 Cor.": "2 Corinthians",
  "2 Pet.": "2 Peter",
  "2 Thess.": "2 Thessalonians",
  "2 Tim.": "2 Timothy",
  "3 John": "3 John",
  Acts: "Acts",
  "Acts.": "Acts",
  Amos: "Amos",
  "Col.": "Colossians",
  "Dan.": "Daniel",
  "Deut.": "Deuteronomy",
  "Ecc.": "Ecclesiastes",
  "Eph.": "Ephesians",
  "Ex.": "Exodus",
  "Ezek.": "Ezekiel",
  "Ezk.": "Ezekiel",
  "Gal.": "Galatians",
  "Gen.": "Genesis",
  "Heb.": "Hebrews",
  "I Chron.": "1 Chronicles",
  "I Cor.": "1 Corinthians",
  "I Pet.": "1 Peter",
  "ICor.": "1 Corinthians",
  "II Tim.": "2 Timothy",
  "Isa.": "Isaiah",
  "Jas.": "James",
  "Jer.": "Jeremiah",
  Job: "Job",
  Joel: "Joel",
  John: "John",
  "Josh.": "Joshua",
  Jude: "Jude",
  "Lev.": "Leviticus",
  Luke: "Luke",
  "Mal.": "Malachi",
  Mark: "Mark",
  "Mat.": "Matthew",
  "Matt.": "Matthew",
  "Mic.": "Micah",
  "Neh.": "Nehemiah",
  "Phil.": "Philippians",
  "Prov.": "Proverbs",
  "Ps.": "Psalms",
  "Rev.": "Revelation",
  "Rom.": "Romans",
  Titus: "Titus",
  "Zech.": "Zechariah",
};

const findUniqueNamesForBibleBooks = (catechismArray) => {
  let uniqueBooks = new Set();

  catechismArray.forEach((item) => {
    item.proofTexts.forEach((proof) => {
      proof.forEach((verse) => {
        uniqueBooks.add(verse.book);
      });
    });
  });

  // Convert the Set to an array
  uniqueBooks = Array.from(uniqueBooks);

  console.log(uniqueBooks.sort());
};

const findAnswerAndProofTextLengthMismatch = (catechismArray) => {
  catechismArray.map((item) => {
    const { id, answer } = item;
    if (item.proofTexts) {
      if (answer.length !== item.proofTexts.length) {
        const excludedIds = [11, 12, 42, 50, 90];
        if (!excludedIds.includes(id)) {
          console.log({
            id,
            answer: answer.length,
            proofTexts: item.proofTexts.length,
          });
        }
      }
    }
  });
};

const removeLeadingSpace = (str) => {
  if (str.charAt(0) === " ") {
    return str.substring(1);
  }
  return str;
};

const createOutputOfFormattedArray = (newCatechismArray, outputPath) => {
  const output = `const formattedArray = ${JSON.stringify(
    newCatechismArray,
    null,
    2
  )};\n\nmodule.exports = { formattedArray };`;

  return fs.writeFile(outputPath, output, (err) => {
    if (err) {
      console.error("Error writing to the file:", err);
      return;
    }
    console.log("Conversion and export completed successfully.");
  });
};

const convertAnswerStringToArray = (catechismArray) => {
  let newFormatData = [];
  catechismArray.map((item) => {
    const { answer } = item;
    const regex = /\[([a-z])\]/g;
    // const regex = /\[\d+\]/g;
    let segments = answer.split(regex);
    let newArray = segments.filter((segment) => segment.trim() !== "");

    newFormatData.push({
      ...item,
      answer: newArray.map((i, index) => {
        if (index === 0) return i;
        return i.substring(1);
      }),
    });
  });

  return newFormatData;
};

const convertStringsToArraysInProofTexts = (inputArray) => {
  let newArray = [];
  [...inputArray].map((item) => {
    newArray.push({
      ...item,
      proofTexts: item.proofTexts.map((i) => {
        return i.split(";").map((item) => item.trim());
      }),
    });
  });
  return newArray;
};

const convertProofTextVersesWithNoBook = (inputArray) => {
  let newArray = [];
  [...inputArray].map((item) => {
    newArray.push({
      ...item,
      proofTexts: item.proofTexts.map((i) => {
        return i.map((j, index) => {
          const containsNoLetters = /^[^a-zA-Z]*$/.test(j);
          if (containsNoLetters) {
            // Grab the previous strings book name
            const book = i[index - 1].match(/^(.*?)\s*\d+:\d+/)[1];
            // Apply it to the no book name string that proceeds, which indicates there the same book reference
            return `${book} ${j}`;
          }
          return j;
        });
      }),
    });
  });
  return newArray;
};

const convertProofTextStringToObject = (inputArray) => {
  let newArray = [];
  [...inputArray].map((item, index) => {
    newArray.push({
      ...item,
      proofTexts: item.proofTexts.map((i) => {
        return i.map((j) => {
          const book = j.match(/^(.*?)\s*\d+:\d+/)[1];
          const verse = j.split(book)[1];
          return {
            book,
            verse: removeLeadingSpace(verse),
            text: "",
          };
        });
      }),
    });
  });
  return newArray;
};

const convertBibleBookToFullName = (inputArray) => {
  let newArray = [];
  [...inputArray].map((item) => {
    newArray.push({
      ...item,
      proofTexts: item.proofTexts.map((i) => {
        return i.map((j) => {
          return {
            ...j,
            book: bibleAbbreviationsToFullNameShorter[j.book],
          };
        });
      }),
    });
  });
  return newArray;
};

module.exports = {
  bibleAbbreviationsToFullName,
  bibleAbbreviationsToFullNameShorter,
  findUniqueNamesForBibleBooks,
  findAnswerAndProofTextLengthMismatch,
  removeLeadingSpace,
  createOutputOfFormattedArray,
  convertAnswerStringToArray,
  convertStringsToArraysInProofTexts,
  convertProofTextVersesWithNoBook,
  convertProofTextStringToObject,
  convertBibleBookToFullName,
};
