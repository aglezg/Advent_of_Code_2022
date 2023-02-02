import { Rope } from './rope';
import { Direction } from '../types/direction';
import { Map } from './map';
import { assert } from 'console';

/**
 * Class representing a game.
 * @class RopeGame
 * @property {Rope} rope - The rope of the game.
 */
export class RopeGame {

    private map: Map = new Map([-1, 1], [-1, 1]);

    /**
     * Create a game.
     * @param rope Rope of the game.
     */
    constructor (private rope: Rope) {}

    /**
     * Redimension map according to the position of the rope.
     * @param {number} margin - The margin to add to the size of the map.
     */
    private redimensionMap(margin : number = 10): void {
        let head: [number, number] = this.rope.getHead();
        if (head[0] < this.map.getHorizontalSize()[0]) {
            this.map.setHorizontalSize([head[0] - margin, this.map.getHorizontalSize()[1]]);
        } else if (head[0] > this.map.getHorizontalSize()[1]) {
            this.map.setHorizontalSize([this.map.getHorizontalSize()[0], head[0] + margin]);
        }
        if (head[1] < this.map.getVerticalSize()[0]) {
            this.map.setVerticalSize([head[1] - margin, this.map.getVerticalSize()[1]]);
        } else if (head[1] > this.map.getVerticalSize()[1]) {
            this.map.setVerticalSize([this.map.getVerticalSize()[0], head[1] + margin]);
        }
    }

    /**
     * Get map print character.
     * @param {[number, number]} position - The position to print.
     * @throws {Error} err: position is not in the map.
     * @returns {string} The character to print.
     */
    private getMapPrintChar(position: [number, number]): string {
        assert(position[0] >= this.map.getHorizontalSize()[0] && position[0] <= this.map.getHorizontalSize()[1] && position[1] >= this.map.getVerticalSize()[0] && position[1] <= this.map.getVerticalSize()[1], 'err: position is not in the map');
        for (let i = 0; i < this.rope.getKnots().length; i++) {
            if (position[0] === this.rope.getKnots()[i][0] && position[1] === this.rope.getKnots()[i][1]) {
                if (i == 0) {
                    return 'H';
                } else {
                    return i.toString();
                }
            }
        }
        return '·';
    }

    /**
     * Print the map of the game.
     */
    public printMap(): void {
        this.redimensionMap();
        let horizontalSize: [number, number] = this.map.getHorizontalSize();
        let verticalSize: [number, number] = this.map.getVerticalSize();
        for(let i = verticalSize[1]; i >= verticalSize[0]; i--) {
            let line: string = '';
            for(let j = horizontalSize[0]; j <= horizontalSize[1]; j++) {
                line += this.getMapPrintChar([j, i]);
            }
            console.log(line);
        }
    }

    /**
     * Get rope of the game.
     * @returns {Rope} The rope of the game.
     */
    public getRope(): Rope {
        return this.rope;
    }

    /**
     * Play a game.
     * @param {[Direction, number][]} input - The input of the game.
     * @param boolean - Print the map of the game.
     * @returns {number} Number of positions visited by tail.
     * */
    public play(input: [Direction, number][], print: boolean = false): number {
        let visitedPositions: {[key: string]: boolean} = {};
        let tail: [number, number] = this.rope.getTail();
        visitedPositions[tail.toString()] = true;

        if (print) {
            this.printMap();
        }

        for (let i = 0; i < input.length; i++) {
            let direction: Direction = input[i][0];
            let length: number = input[i][1];
            for (let j = 0; j < length; j++) {
                this.rope.move(direction);
                tail = this.rope.getTail();
                visitedPositions[tail.toString()] = true;
            }
            if (print) {
                process.stdout.write(`\n${direction} ${length}\n`);
                this.printMap();
            }
        }

        return Object.keys(visitedPositions).length;
    }
}