import { readFileAsKey } from '../utils/fsUtils';
import * as path from 'path';

const getInput = () => path.join(__dirname, '/input.txt');

const rowCal = (row: string[], accumulator: number[]) => {
  row.forEach((el: string, i) => {
    const _number = Number(el);
    accumulator[i] += _number === 1 ? 1 : -1;
  });
};

const significantCount = (numbers: string[][], index: number) =>
  numbers.reduce((it, row: string[]) => {
    const cell = Number(row[index]);
    return it + (cell === 1 ? 1 : -1);
  }, 0);

const genPowerConsumtion = () => {
  const numbers = readFileAsKey(getInput());
  let accumulator = Array(numbers[0].length).fill(0);
  numbers.forEach((row) => rowCal(row, accumulator));
  accumulator = accumulator.map((el) => (el > 0 ? '1' : '0'));

  const delta = Number.parseInt(accumulator.join(''), 2);
  accumulator = accumulator.map((el) => (el === '1' ? '0' : '1'));
  const gamma = Number.parseInt(accumulator.join(''), 2);

  console.log(`Power consumption is: ${delta * gamma}`);
};

const genOxygenConsumption = (
  numbers: string[][],
  index: number
): string[][] => {
  if (numbers.length === 1) {
    return numbers;
  }

  if (numbers.length === 2) {
    return Number(numbers[0][index]) === 1
      ? numbers.slice(0, 1)
      : numbers.slice(1, 2);
  }

  const significat = significantCount(numbers, index);
  let _numbers = [];
  if (significat >= 0) {
    _numbers = numbers.filter((row: string[]) => Number(row[index]) === 1);
  } else {
    _numbers = numbers.filter((row: string[]) => Number(row[index]) !== 1);
  }
  return genOxygenConsumption(_numbers, index + 1);
};

const genCO2Consumption = (numbers: string[][], index: number): string[][] => {
  if (numbers.length === 1) {
    return numbers;
  }

  if (numbers.length === 2) {
    return Number(numbers[0][index]) === 0
      ? numbers.slice(0, 1)
      : numbers.slice(1, 2);
  }

  const significat = significantCount(numbers, index);

  let _numbers = [];
  if (significat >= 0) {
    _numbers = numbers.filter((row: string[]) => Number(row[index]) !== 1);
  } else {
    _numbers = numbers.filter((row: string[]) => Number(row[index]) === 1);
  }
  return genCO2Consumption(_numbers, index + 1);
};

const genLifeSupportRating = () => {
  const numbers = readFileAsKey(getInput());
  const oxygenConsumption = Number.parseInt(
    genOxygenConsumption(numbers, 0)[0].join(''),
    2
  );

  const co2Consumption = Number.parseInt(
    genCO2Consumption(numbers, 0)[0].join(''),
    2
  );
  console.log(`Life support rating is: ${oxygenConsumption * co2Consumption}`);
};

export { genPowerConsumtion, genLifeSupportRating };
