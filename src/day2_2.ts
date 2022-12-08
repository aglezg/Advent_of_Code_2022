import { existsSync, readFileSync } from 'fs';
type shape = "paper" | "rock" | "scissors";
type resultType = "X" | "Y" | "Z";
type enemyShapeTypes = "A" | "B" | "C";


function calculateResult(myShape: shape, enemyShape: shape): number {
    let result: number = 0;
    switch(myShape) {
        case "paper":
            result += 2;
            switch(enemyShape) {
                case "paper":
                    result += 3;
                    break;
                case "rock":
                    result += 6;
                    break;
                case "scissors":
                    result += 0;
                    break;
            }
            break;
        case "rock":
            result += 1;
            switch(enemyShape) {
                case "paper":
                    result += 0;
                    break;
                case "rock":
                    result += 3;
                    break;
                case "scissors":
                    result += 6;
                    break;
            }
            break;
        case "scissors":
            result += 3;
            switch(enemyShape) {
                case "paper":
                    result += 6;
                    break;
                case "rock":
                    result += 0;
                    break;
                case "scissors":
                    result += 3;
                    break;
            }
            break;
        default:
            console.log("this should never be displayed");
            break;
    }
    return result;
}


function translateToShapes(shapeType : enemyShapeTypes): shape {
    switch(shapeType) {
        case "A":
            return "rock";
        case "B":
            return "paper";
        case "C":
            return "scissors";
        default:
            console.log("this should not be displayed");
            return "rock";
    }
}

// A rock
// B Paper
// C Scissors

// X lose
// Y draw
// Z win

function whatShapeShouldIUse(enemyShape: enemyShapeTypes, result: resultType): shape {
    switch(enemyShape) {
        case "A":
            switch(result) {
                case "X":
                    return "scissors";
                case "Y":
                    return "rock";
                case "Z":
                    return "paper";
            }
        case "B":
            switch(result) {
                case "X":
                    return "rock";
                case "Y":
                    return "paper";
                case "Z":
                    return "scissors";
            }
        case "C":
            switch(result) {
                case "X":
                    return "paper";
                case "Y":
                    return "scissors";
                case "Z":
                    return "rock";
            }
    }
}


let input: string = process.argv[2];
let data: string = "";

if (!existsSync(input)) {
    console.error("err: file does not exist")
} else {
    data = readFileSync(input).toString();
}

let roundsVector: string[] = data.split(/\r?\n/);

let puntuation: number = 0;

roundsVector.forEach((pair: string) => {
    let combat: string[] = pair.split(" ");
    let enemyShape: shape = translateToShapes(combat[0] as enemyShapeTypes);
    let myShape: shape = whatShapeShouldIUse(combat[0] as enemyShapeTypes, combat[1] as resultType);
    puntuation += calculateResult(myShape, enemyShape);
});

console.log(puntuation);