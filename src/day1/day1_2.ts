import { existsSync, readFileSync } from 'fs';
import { exit } from 'process';

let cookiesVector: number[] = [0];

if (process.argv.length < 3) {
  console.error("err: program must receive a third parameter [input.txt]");
  exit(1);
}

let input: string = process.argv[2];

let data: string = "";

if (!existsSync(input)) {
  console.error("err: file does not exist")
} else {
  data = readFileSync(input).toString();
}

const vector: string[] = data.split(/\r?\n/);

let i: number = 0;
vector.forEach((element: string) => {
  if (element != '') {
    cookiesVector[i] += Number(element);
  } else {
    i += 1;
    cookiesVector.push(0);
  }
});

let orderVector: number[] = cookiesVector.sort(function(a, b){return b-a});

let last3Elements: number[] = orderVector.slice(0, 3);

console.log(last3Elements)

let sum: number = 0;

last3Elements.forEach((el: number) => {
  sum += el;
});

console.log(sum);