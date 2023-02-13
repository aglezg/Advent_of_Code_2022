import { existsSync, readFileSync } from "fs";
import { argv, exit } from "process";
import { CRT } from "./class/crt";

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

// Sprite
let sprite: string = "###.....................................";

// Create CRT
let crt: CRT = new CRT(sprite);

// Execute instructions
instructions.forEach((instruction: string) => {
    let instructionParts: string[] = instruction.split(' ');
    switch(instructionParts[0]) {
        case 'noop':
            // Draw and increment 1 cycle
            crt.draw(cycle - 1);
            cycle++;
            break;
        case 'addx':
            // Check if second part is a number
            if (isNaN(Number(instructionParts[1]))) {
                console.error('err: second part of instruction "' + instruction + '" is not a number');
                exit(1);
            }

            // Draw and increment 1 cycle
            crt.draw(cycle - 1);    
            cycle++;

            // Draw, increment X, change sprite and increment 1 cycle
            crt.draw(cycle - 1);
            X += Number(instructionParts[1]);

            // Create the new sprite
            let newSprite: string = '';
            for (let i = 0; i < sprite.length; i++) {
                if (i === X - 1 || i === X || i === X + 1) {
                    newSprite += '#';
                } else {
                    newSprite += '.';
                }
            }

            // Update sprite
            sprite = newSprite;
            crt.updateSprite(sprite);

            // Increment 1 cycle
            cycle++;

            break;
        default:
            console.error('err: unknown instruction "' + instructionParts[0] + '"');
            exit(1);
    }
});

// Print CRT
crt.print();