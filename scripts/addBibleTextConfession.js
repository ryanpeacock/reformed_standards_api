const axios = require("axios");
const { confessionOfFaith } = require("../data/standards/westminster");
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

const colorize = (text, colorCode) => `\x1b[${colorCode}m${text}\x1b[0m`;
// Your array of data
const data = [...confessionOfFaith.slice(24, 33)];

let totalMainStartTime;
let totalMainEndTime;
let timeTakenInSecondsTotalMain;
let verseBuildUp = 0;
let estimatedVerseBuildUp;

async function makeApiCalls() {
  let chapterNumbers = 0;
  let totalTimeProgress = 0;
  let totalProofTexts = 0;
  data.map((item) => {
    item.paragraphs.map((i) => {
      i.proofTexts.map((j) => {
        j.map((k) => {
          totalTimeProgress = totalTimeProgress + 3.5;
          totalProofTexts = totalProofTexts + 1;
        });
      });
    });
  });
  estimatedVerseBuildUp = formatTime(totalTimeProgress);
  totalMainStartTime = new Date();
  console.log(
    colorize(`Total Time Estimated - ${formatTime(totalTimeProgress)}`, "46")
  );
  for (const item of data) {
    console.log(
      colorize(
        `Chapter Progress - ${chapterNumbers + 1} / ${data.length}`,
        "37"
      )
    );
    console.log(
      colorize(`Total Time Estimated - ${formatTime(totalTimeProgress)}`, "42")
    );
    let paragraphNumbers = 0;
    for (const paragraph of item.paragraphs) {
      console.log(
        colorize(
          `Pargraph Progress - ${paragraphNumbers + 1} / ${
            item.paragraphs.length
          }`,
          "36"
        )
      );
      console.log(
        colorize(
          `Total Time Estimated - ${formatTime(totalTimeProgress)}`,
          "45"
        )
      );
      let outterProofTextsArrayNumbers = 0;
      for (const proofTextSet of paragraph.proofTexts) {
        console.log(
          colorize(
            `Outter Proof Texts Array Progress - ${
              outterProofTextsArrayNumbers + 1
            } / ${paragraph.proofTexts.length}`,
            "33"
          )
        );
        console.log(
          colorize(
            `Total Time Estimated - ${formatTime(totalTimeProgress)}`,
            "47"
          )
        );
        let innerProofTextsArrayNumbers = 0;
        let verseStartTime;
        let verseEndTime;
        let timeDifference;
        for (const proofText of proofTextSet) {
          if (innerProofTextsArrayNumbers === 0) {
            verseStartTime = new Date();
          }
          if (innerProofTextsArrayNumbers > 0) {
            verseEndTime = new Date();
            timeDifference = (verseEndTime - verseStartTime) / 1000;
            console.log(`That took ${timeDifference} seconds`);
            verseBuildUp = verseBuildUp + timeDifference;
            verseStartTime = new Date();
          }
          console.log(
            colorize(
              `Inner Proof Texts Array Progress - ${
                innerProofTextsArrayNumbers + 1
              } / ${proofTextSet.length}`,
              "35"
            )
          );
          try {
            const response = await axios.get(
              `https://bible-api.com/${proofText.book}${proofText.verse}?translation=kjv`
            );

            // Assign the API response to the text field
            proofText.text = response.data.verses.map((v) => {
              return {
                verse: v.verse,
                text: v.text,
              };
            });

            // Delay for 4 seconds before the next API call
            console.log(
              colorize(
                `Success! for ${proofText.book} ${proofText.verse}`,
                "32"
              )
            );
            await new Promise((resolve) => setTimeout(resolve, 3000));
          } catch (error) {
            console.error(
              colorize(
                `Error fetching data for ${proofText.book} ${proofText.verse}: ${error.message}`,
                "30"
              )
            );
          }
          totalProofTexts = totalProofTexts - 1;
          console.log(
            colorize(`Only ${totalProofTexts} more proof texts to go!`, "44")
          );
          totalTimeProgress = totalTimeProgress - 3.5;
          innerProofTextsArrayNumbers = innerProofTextsArrayNumbers + 1;
        }
        outterProofTextsArrayNumbers = outterProofTextsArrayNumbers + 1;
      }
      paragraphNumbers = paragraphNumbers + 1;
    }
    chapterNumbers = chapterNumbers + 1;
  }
}

makeApiCalls()
  .then(() => {
    // All API calls are completed
    console.log("API calls completed.");
    totalMainEndTime = new Date();
    timeTakenInSecondsTotalMain =
      (totalMainEndTime - totalMainStartTime) / 1000;
    console.log({
      timeTakenInSecondsTotalMain,
      formattedTime: formatTime(timeTakenInSecondsTotalMain),
      verseBuildUp,
      verseFormatted: formatTime(verseBuildUp),
      estimatedVerseBuildUp,
    });
    // You can now access the updated data object with text fields populated
    const newPath = "data/formatting/output/confessionWithScripture4.js";
    createOutputOfFormattedArray(data, newPath);
  })
  .catch((err) => {
    console.error("An error occurred:", err);
  });
