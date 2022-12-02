import fs from 'fs';
import path from 'path';

const inputPath = './data/example.txt';
// const inputPath = './data/puzzle.txt'

const moves = {
  rock: {
    name: 'rock',
    points: 1,
  },
  paper: {
    name: 'paper',
    points: 2,
  },
  scissors: {
    name: 'scissors',
    points: 3,
  },
} as const;

const lostPoints = 0;
const drawPoints = 3;
const wonPoints = 6;

type Move = typeof moves[keyof typeof moves];
type Winner = 'player' | 'opponent' | 'draw';
interface Result {
  winner: Winner;
  score: number;
}
type RawMove = 'A' | 'B' | 'C' | 'X' | 'Y' | 'Z';

const getMove = (input: RawMove): Move => {
  switch (input) {
    case 'A':
    case 'X':
      return moves.rock;
    case 'B':
    case 'Y':
      return moves.paper;
    case 'C':
    case 'Z':
      return moves.scissors;
  }
};

const getResult = (player: Move, opponent: Move): Result => {
  if (player.name === 'rock' && opponent.name === 'paper') {
    return {
      winner: 'opponent',
      score: moves.rock.points + lostPoints,
    };
  }

  if (player.name === 'rock' && opponent.name === 'scissors') {
    return {
      winner: 'player',
      score: moves.rock.points + wonPoints,
    };
  }

  if (player.name === 'paper' && opponent.name === 'rock') {
    return {
      winner: 'player',
      score: moves.paper.points + wonPoints,
    };
  }

  if (player.name === 'paper' && opponent.name === 'scissors') {
    return {
      winner: 'opponent',
      score: moves.paper.points + lostPoints,
    };
  }

  if (player.name === 'scissors' && opponent.name === 'rock') {
    return {
      winner: 'opponent',
      score: moves.scissors.points + lostPoints,
    };
  }

  if (player.name === 'scissors' && opponent.name === 'paper') {
    return {
      winner: 'player',
      score: moves.scissors.points + wonPoints,
    };
  }

  return {
    winner: 'draw',
    score: moves[player.name].points + drawPoints,
  };
};

const inputString = fs.readFileSync(path.resolve(__dirname, inputPath), {
  encoding: 'utf8',
});

const roundStrings = inputString.split('\n');
const rounds = roundStrings.map((roundString) =>
  roundString.split(' ')
) as RawMove[][];

const getScore = (roundsInput: RawMove[][]) => {
  const totalScore = roundsInput.reduce((allScores, round) => {
    const opponent = getMove(round[0]);
    const player = getMove(round[1]);
    const winner = getResult(player, opponent);
    return allScores + winner.score;
  }, 0);

  return totalScore;
};

const score = getScore(rounds);
console.log('answer:', score);
