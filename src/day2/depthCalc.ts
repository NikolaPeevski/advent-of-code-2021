import { readFileAsKeySpace } from '../utils/fsUtils';
import * as path from 'path';

const getInput = () => path.join(__dirname, '/input.txt');

interface IAccumulator {
  horizontal: number;
  depth: number;
}

interface IAimAccumulator {
  horizontal: number;
  depth: number;
  aim: number;
}

const iterator = (element: string[], accumulator: IAccumulator) => {
  if (element[0] === 'forward') {
    accumulator.horizontal += Number(element[1]);
  } else {
    accumulator.depth +=
      element[0] === 'up' ? -Number(element[1]) : Number(element[1]);
  }
};

const aimIterator = (element: string[], accumulator: IAimAccumulator) => {
  if (element[0] === 'forward') {
    const increase = Number(element[1]);
    accumulator.horizontal += increase;
    accumulator.depth += increase * accumulator.aim;
  } else {
    accumulator.aim +=
      element[0] === 'up' ? -Number(element[1]) : Number(element[1]);
  }
};

const depthCalc = (): void => {
  const moves = readFileAsKeySpace(getInput());
  const accumulator: IAccumulator = {
    depth: 0,
    horizontal: 0
  };
  moves.forEach((el) => iterator(el, accumulator));

  console.log(`Final depth: ${accumulator.depth * accumulator.horizontal}`);
};

const depthAimCalc = (): void => {
  const moves = readFileAsKeySpace(getInput());
  const accumulator: IAimAccumulator = {
    depth: 0,
    aim: 0,
    horizontal: 0
  };
  moves.forEach((el) => aimIterator(el, accumulator));

  console.log(`Final aim depth: ${accumulator.depth * accumulator.horizontal}`);
};

export { depthCalc, depthAimCalc };
