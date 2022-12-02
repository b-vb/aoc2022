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
type EndState = 'lose' | 'win' | 'draw';
type Winner = 'player' | 'opponent' | 'draw';
interface Result {
  winner: Winner;
  score: number;
}
type RawMove = 'A' | 'B' | 'C';
type RawEndState = 'X' | 'Y' | 'Z';
type RawInput = RawMove | RawEndState;

const getMove = (input: RawInput): Move | undefined => {
  switch (input) {
    case 'A':
      return moves.rock;
    case 'B':
      return moves.paper;
    case 'C':
      return moves.scissors;
    default:
      return undefined;
  }
};

const getEndState = (input: RawInput): EndState | undefined => {
  switch (input) {
    case 'X':
      return 'lose';
    case 'Y':
      return 'draw';
    case 'Z':
      return 'win';
    default:
      return undefined;
  }
};

const getResult = (
  endState?: EndState,
  opponent?: Move
): Result | undefined => {
  if (!endState || !opponent) return undefined;

  if (endState === 'draw') {
    return {
      winner: 'draw',
      score: moves[opponent.name].points + drawPoints,
    };
  }

  if (endState === 'lose') {
    if (opponent.name === 'paper') {
      return {
        winner: 'opponent',
        score: moves.rock.points + lostPoints,
      };
    }

    if (opponent.name === 'rock') {
      return {
        winner: 'opponent',
        score: moves.scissors.points + lostPoints,
      };
    }

    if (opponent.name === 'scissors') {
      return {
        winner: 'opponent',
        score: moves.paper.points + lostPoints,
      };
    }
  }

  if (endState === 'win') {
    if (opponent.name === 'paper') {
      return {
        winner: 'player',
        score: moves.scissors.points + wonPoints,
      };
    }

    if (opponent.name === 'rock') {
      return {
        winner: 'player',
        score: moves.paper.points + wonPoints,
      };
    }

    if (opponent.name === 'scissors') {
      return {
        winner: 'player',
        score: moves.rock.points + wonPoints,
      };
    }
  }
};

const inputString = fs.readFileSync(path.resolve(__dirname, inputPath), {
  encoding: 'utf8',
});

const roundStrings = inputString.split('\n');
const rounds = roundStrings.map((roundString) =>
  roundString.split(' ')
) as RawInput[][];

const getScore = (roundsInput: RawInput[][]) => {
  const totalScore = roundsInput.reduce((allScores, round) => {
    const opponent = getMove(round[0]);
    const endState = getEndState(round[1]);
    const winner = getResult(endState, opponent);
    if (!winner) return allScores;
    return allScores + winner.score;
  }, 0);

  return totalScore;
};

const score = getScore(rounds);
console.log('answer:', score);
