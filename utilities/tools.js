const formatSequentialNumbers = (input) => {
  const numbers = input.split(",").map(Number); // Split the input string and convert to an array of numbers
  let result = [];
  let start = numbers[0];

  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] !== numbers[i - 1] + 1) {
      if (start !== numbers[i - 1]) {
        result.push(start + "-" + numbers[i - 1]);
      } else {
        result.push(start.toString());
      }
      start = numbers[i];
    }
  }

  if (start !== numbers[numbers.length - 1]) {
    result.push(start + "-" + numbers[numbers.length - 1]);
  } else {
    result.push(start.toString());
  }

  return result.join(",");
};

module.exports = { formatSequentialNumbers };
