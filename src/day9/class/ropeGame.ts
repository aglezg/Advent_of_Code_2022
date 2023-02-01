import { Rope } from './rope';
import { Direction } from '../types/direction';

/**
 * Class representing a game.
 * @class RopeGame
 * @property {Rope} rope - The rope of the game.
 */
export class RopeGame {

    /**
     * Create a game.
     * @param rope Rope of the game.
     */
    constructor (private rope: Rope) {
        // assert(this.isRopeInsideMap(), 'err: rope is not inside the map');
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
     * @returns {number} Number of positions visited by tail.
     * */
    public play(input: [Direction, number][]): number {
        let visitedPositions: {[key: string]: boolean} = {};
        let tail: [number, number] = this.rope.getTail();
        visitedPositions[tail.toString()] = true;

        for (let i = 0; i < input.length; i++) {
            let direction: Direction = input[i][0];
            let length: number = input[i][1];
            for (let j = 0; j < length; j++) {
                this.rope.move(direction);
                tail = this.rope.getTail();
                visitedPositions[tail.toString()] = true;
            }
        }

        return Object.keys(visitedPositions).length;
    }
}