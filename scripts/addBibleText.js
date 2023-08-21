const axios = require("axios");
const { largerCatechism } = require("../data/largerCatechism");
const { createOutputOfFormattedArray } = require("../utilities/formatting");

function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = remainingSeconds.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

const array = largerCatechism.slice(150, 196);

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const colorize = (text, colorCode) => `\x1b[${colorCode}m${text}\x1b[0m`;

let totalSeconds = 0;
array.map((item) => {
  if (item?.proofTexts) {
    item.proofTexts.map((i) => {
      i.map((j, index) => {
        totalSeconds = totalSeconds + 4;
      });
    });
  }
});
let remainingSeconds = totalSeconds;

const processArray = async () => {
  console.log(colorize(`Remaining Time ${formatTime(remainingSeconds)}`, "32")); // Color 36: Cyan
  const totalQuestionCount = array.length;
  let currentQuestionCount = 0;

  let bigArrayTotalCount = 0;
  let bigArrayCurrentCount = 0;

  let smallArrayTotalCount = 0;
  let smallArrayCurrentCount = 0;

  for (const obj of array) {
    const proofTexts = obj?.proofTexts;

    if (proofTexts) {
      bigArrayCurrentCount = 0;
      bigArrayTotalCount = proofTexts.length;

      for (const innerArray of proofTexts) {
        smallArrayCurrentCount = 0;
        smallArrayTotalCount = innerArray.length;
        for (const proofText of innerArray) {
          const verse = `${proofText.book}${proofText.verse}`;

          try {
            const response = await axios.get(
              `https://bible-api.com/${verse}?translation=kjv`
            );
            const verseText = response.data.verses.map((i) => {
              return {
                verse: i.verse,
                text: i.text,
              };
            });

            proofText.text = verseText;
            console.log(
              colorize(
                `Fetched text for verse ${verse} for Question ${obj.id}`,
                "36"
              )
            ); // Color 36: Cyan
            remainingSeconds = remainingSeconds - 4;

            // Introduce a delay of 10 seconds before the next API call
            await delay(4000);
          } catch (error) {
            console.error(
              colorize(
                `Failed to fetch text for verse ${verse} for Question ${obj.id}: ${error.message}`,
                "31"
              ) // Color 31: Red
            );
          }
          smallArrayCurrentCount++;
          console.log(
            colorize(
              `Small Array Progress: ${smallArrayCurrentCount}/${smallArrayTotalCount}`,
              "37"
            )
          ); // Color 37: white
        }
        console.log(
          colorize(`Remaining Time ${formatTime(remainingSeconds)}`, "32")
        ); // Color 36: Cyan
        bigArrayCurrentCount++;
        console.log(
          colorize(
            `Big Array Progress: ${bigArrayCurrentCount}/${bigArrayTotalCount}`,
            "35"
          )
        ); // Color 35: Magenta
      }

      currentQuestionCount++;
      console.log(
        colorize(
          `Outer Array Progress: ${currentQuestionCount}/${totalQuestionCount}`,
          "33"
        )
      ); // Color 33: Yellow
    }
  }
  const newFilePath = "data/output/withScripture/part4.js";
  createOutputOfFormattedArray(array, newFilePath);
};

processArray();
