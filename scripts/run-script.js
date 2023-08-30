// Just throw in stuff you want ran and than use npm run script to run it
const fs = require("fs");
const readline = require("readline");
const filePath = "data/raw_text/heidelbergCatechismRCUS3.txt";

const readStream = fs.createReadStream(filePath, "utf8");

const writeStream = fs.createWriteStream(
  "data/raw_text/heidelbergCatechismRCUS.txt"
);

const rl = readline.createInterface({
  input: readStream,
  output: writeStream, // This will write the edited lines to the new file
});
let emptySpaceCounter = 1;

const emptySpaceMap = {
  1: "-----------------------------------  SECTION  -----------------------------------",
  2: "----------------  ANSWER  ----------------",
  3: "----------------  PROOF TEXTS  ----------------",
};

let newArray = [];

let inTheZone = false;
let newAnswerString = "";
rl.on("line", (line) => {
  if (line.startsWith("----------------  PROOF TEXTS  ----------------")) {
    inTheZone = true;
    writeStream.write(line + "\n");
  } else if (
    line.startsWith(
      "-----------------------------------  SECTION  -----------------------------------"
    )
  ) {
    inTheZone = false;
    if (newAnswerString !== "") {
      writeStream.write(
        newAnswerString +
          "\n" +
          "-----------------------------------  SECTION  -----------------------------------" +
          "\n"
      );
      newAnswerString = "";
    } else {
      writeStream.write(line + "\n");
    }
  } else {
    if (inTheZone) {
      newAnswerString =
        newAnswerString +
        (newAnswerString === "" || line[0] === " " ? "" : " ") +
        line;
    } else {
      writeStream.write(line + "\n");
    }
  }
});

rl.on("close", () => {
  readStream.close();
  writeStream.close();
  console.log("File editing complete.");
});
