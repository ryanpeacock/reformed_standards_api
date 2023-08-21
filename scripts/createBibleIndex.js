const {
  largerCatechismWithScripture,
} = require("../data/largerCatechismWithScripture");
const { createOutputOfFormattedArray } = require("../utilities/formatting");

const bibleBooks = {
  Genesis: [],
  Exodus: [],
  Leviticus: [],
  Numbers: [],
  Deuteronomy: [],
  Joshua: [],
  Judges: [],
  Ruth: [],
  "1 Samuel": [],
  "2 Samuel": [],
  "1 Kings": [],
  "2 Kings": [],
  "1 Chronicles": [],
  "2 Chronicles": [],
  Ezra: [],
  Nehemiah: [],
  Esther: [],
  Job: [],
  Psalms: [],
  Proverbs: [],
  Ecclesiastes: [],
  "Song of Solomon": [],
  Isaiah: [],
  Jeremiah: [],
  Lamentations: [],
  Ezekiel: [],
  Daniel: [],
  Hosea: [],
  Joel: [],
  Amos: [],
  Obadiah: [],
  Jonah: [],
  Micah: [],
  Nahum: [],
  Habakkuk: [],
  Zephaniah: [],
  Haggai: [],
  Zechariah: [],
  Malachi: [],
  Matthew: [],
  Mark: [],
  Luke: [],
  John: [],
  Acts: [],
  Romans: [],
  "1 Corinthians": [],
  "2 Corinthians": [],
  Galatians: [],
  Ephesians: [],
  Philippians: [],
  Colossians: [],
  "1 Thessalonians": [],
  "2 Thessalonians": [],
  "1 Timothy": [],
  "2 Timothy": [],
  Titus: [],
  Philemon: [],
  Hebrews: [],
  James: [],
  "1 Peter": [],
  "2 Peter": [],
  "1 John": [],
  "2 John": [],
  "3 John": [],
  Jude: [],
  Revelation: [],
};

largerCatechismWithScripture.map((item) => {
  if (item?.proofTexts) {
    item.proofTexts.map((i, index) => {
      i.map((j) => {
        bibleBooks[j.book].push({
          chapter: parseInt(j.verse.split(":")[0]),
          verse: j.verse.split(":")[1],
          text: j.text,
          questionSection: {
            number: item.id,
            question: item.question,
          },
          catechismQuestion: item.id,
          answerSection: {
            section: index,
            fullPassage: item.answer,
          },
        });
      });
    });
  }
});
Object.keys(bibleBooks).map((key, index) => {
  bibleBooks[key].sort((a, b) => a.chapter - b.chapter);
});
const newFilePath = "data/output/bible-dictionary.js";
createOutputOfFormattedArray(bibleBooks, newFilePath);
