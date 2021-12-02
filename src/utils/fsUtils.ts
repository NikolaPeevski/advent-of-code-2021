import * as fs from 'fs';

const encoding = 'utf8';

const readFile = (file: string): string => fs.readFileSync(file, { encoding });

const readFileAsNumberArray = (file: string): number[] => {
  return readFile(file)
    .split('\n')
    .map((el) => Number(el));
};

const readFileAsKeySpace = (file: string): string[][] => {
  return readFile(file)
    .split('\n')
    .map((el) => el.split(' '));
};

export { readFileAsNumberArray, readFileAsKeySpace };
