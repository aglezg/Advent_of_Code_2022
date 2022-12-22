import { existsSync, readFileSync } from "fs";
import { argv } from "process";
import { Map } from "./class/map";

// Lectura
let input: string = argv[2];
let lines: string[] = [];

if (!existsSync(input)) {
  console.error("err: file does not exist")
} else {
  lines = readFileSync(input).toString().split(/\r?\n/);
}

// Matrix to use
let matrix: number[][] = [];

// Matrix construction
lines.forEach((line: string) => {
  let vector: number[] = [];
  line.split('').forEach((element: string) => {
    if (isNaN(+element)) {
      console.log('this should never be displayed...');
    } else {
      vector.push(+element);
    }
  });
  matrix.push(vector);
});

// MAIN
let counter: number = 0;
let myMap: Map = new Map(matrix);
for (let i: number = 0; i < myMap.matrix.length; i++) {
  for (let j: number = 0; j < myMap.matrix[i].length; j++) {
    if (myMap.isVisible(i, j)) {
      counter++;
    }
  }
}

// RESULT
console.log(counter);