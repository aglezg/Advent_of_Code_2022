import { existsSync, readFileSync } from "fs";
import { argv, exit } from "process";
import { Direction } from "./types/direction";
import { Rope } from "./class/rope";
import { RopeGame } from "./class/ropeGame";


// Read input content
let input: string = argv[2];
let lines: string[] = [];

if (!existsSync(input)) {
    console.error('err: file does not exist');
    exit(1);
} else {
    lines = readFileSync(input).toString().split(/\r?\n/);
}

// Initialize game
let rope: Rope = new Rope([0, 0], 10);
let game: RopeGame = new RopeGame(rope);

// Play game
let inputArray: [Direction, number][] = [];
for (let i = 0; i < lines.length; i++) {
    let line: string[] = lines[i].split(' ');
    if (line[0] == 'U' || line[0] == 'D' || line[0] == 'L' || line[0] == 'R') {
        inputArray.push([line[0], parseInt(line[1])]);
    }
}

// Print result
console.log(game.play(inputArray));