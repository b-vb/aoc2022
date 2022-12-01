import fs from 'fs';
import path from 'path';

// const inputPath = './data/example.txt';
const inputPath = './data/puzzle.txt';

const inputString = fs.readFileSync(path.resolve(__dirname, inputPath), {
  encoding: 'utf8',
});
const elvesStrings = inputString.split('\n\n');
const elves = elvesStrings.map((elfString) => elfString.split('\n'));

const calories = elves.reduce((caloriesPerElf, elf) => {
  const elfCalories = elf.reduce(
    (sum, calories) => sum + parseInt(calories),
    0
  );

  return [...caloriesPerElf, elfCalories];
}, [] as number[]);

calories.sort((a, b) => a - b);
calories.reverse();

console.log('answer: ', calories[0] + calories[1] + calories[2]);
