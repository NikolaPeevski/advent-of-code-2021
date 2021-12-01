import { readFileAsNumberArray } from '../utils/fsUtils';
import * as path from 'path';

const getInput = () => path.join(__dirname, '/input.txt');

const sonarScan = (num?: number[]): void => {
  const numbers = num || readFileAsNumberArray(getInput());
  let increase = 0;
  let iterator = numbers.length;
  while (iterator-- && iterator !== 0) {
    const num = numbers[iterator];
    const prev = numbers[iterator - 1];
    if (num > prev) {
      increase++;
    }
  }
  console.log(`Sonar scan increase: ${increase}`);
};

const sonarWindowScan = (): void => {
  const numbers = readFileAsNumberArray(getInput());
  const sums = [];
  for (let index = 1; index < numbers.length - 1; index++) {
    const windowA = numbers[index - 1];
    const windowB = numbers[index];
    const windowC = numbers[index + 1];
    sums.push(windowA + windowB + windowC);
  }
  sonarScan(sums);
};

export { sonarScan, sonarWindowScan };
