import { existsSync, readFileSync } from "fs";
import { argv } from "process";
import { Range } from "./class/range";

let input: string = argv[2];
let lines: string[] = [];

if (!existsSync(input)) {
    console.error("err: file does not exist")
} else {
    lines = readFileSync(input).toString().split(/\r?\n/);
}

let counterPairs: number = 0;

lines.forEach((line: string) => {
  let rangeTuple: [Range, Range] = [new Range(0,0), new Range(0, 0)];
  
  let ranges: string[] = line.split(',');

  for (let i: number = 0; i < ranges.length; i++) {
    let rangeValues: string[] = ranges[i].split('-');
    if (rangeValues.length == 2) {
      if (!isNaN(+rangeValues[0]) && !isNaN(+rangeValues[1])) {
        rangeTuple[i].first = +rangeValues[0];
        rangeTuple[i].last = +rangeValues[1];
      } else {
        console.log("this should not be displayed...");
      }
    } else {
      console.log("this should not be displayed...");
    }
  }

  if (rangeTuple[0].include(rangeTuple[1]) || rangeTuple[1].include(rangeTuple[0])) {
    counterPairs += 1;
  }
});

console.log(counterPairs);
