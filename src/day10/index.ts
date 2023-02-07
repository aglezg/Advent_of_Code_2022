import { existsSync, readFileSync } from "fs";
import { argv, exit } from "process";

// Input string
let input: string = argv[2];

// Instructions
let instructions: string[] = [];

// Read input
if (!existsSync(input)) {
    console.error('err: file does not exist');
} else {
    instructions = readFileSync(input).toString().split(/\r?\n/);
}

// Register X
let X: number = 1;

// Current cycle
let cycle: number = 1;

// Cycles to check
let cyclesSignalStrength: { [key: number]: number } = {
    20: 0,
    60: 0,
    100: 0,
    140: 0,
    180: 0,
    220: 0
};

// Execute instructions
instructions.forEach((instruction: string) => {
    let instructionParts: string[] = instruction.split(' ');
    switch(instructionParts[0]) {
        case 'noop':
            // increment 1 cycle
            if (cyclesSignalStrength[cycle] !== undefined) cyclesSignalStrength[cycle] = X * cycle;
            cycle++;
            break;
        case 'addx':
            // Check if second part is a number
            if (isNaN(Number(instructionParts[1]))) {
                console.error('err: second part of instruction "' + instruction + '" is not a number');
                exit(1);
            }
            // Check and increment 1 cycle
            if (cyclesSignalStrength[cycle] !== undefined) cyclesSignalStrength[cycle] = X * cycle;
            cycle++;
            // Check, increment X and increment 1 cycle
            if (cyclesSignalStrength[cycle] !== undefined) cyclesSignalStrength[cycle] = X * cycle;
            X += Number(instructionParts[1]);
            cycle++;
            break;
        default:
            console.error('err: unknown instruction "' + instructionParts[0] + '"');
            exit(1);
    }
});

// Sum all of the cycles signal strength values
let sum: number = 0;
Object.keys(cyclesSignalStrength).forEach((key: string) => {
    sum += cyclesSignalStrength[Number(key)];
});

// Print result
console.log(sum);
