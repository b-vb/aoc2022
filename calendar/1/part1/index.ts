import fs from 'fs';
import path from 'path';

const inputPath = './data/example.txt';
// const inputPath = './data/puzzle.txt'

const inputString = fs.readFileSync(path.resolve(__dirname, inputPath), {
  encoding: 'utf8',
});
const elvesStrings = inputString.split('\n\n');
const elves = elvesStrings.map((elfString) => elfString.split('\n'));

const answer = elves.reduce((highestCalories, elf) => {
  const elfCalories = elf.reduce(
    (sum, calories) => sum + parseInt(calories),
    0
  );

  if (elfCalories > highestCalories) {
    return elfCalories;
  }

  return highestCalories;
}, 0);

console.log('answer: ', answer);
