import { assert } from 'console';
import { Direction } from '../types/direction';

export type Position = [number, number];

/**
 * Class representing a rope.
 * @class Rope
 * @property {Position[]} Knots - Knots positions of the rope.
 */
export class Rope {

    private knots: Position[] = [];

    /**
     * Create a rope.
     * @param {[number, number]} start - The start ubication of the rope.
     * @param {number} knots Number of knots.
     * @throws {Error} If knots is less than 2.
     */
    constructor(start: [number, number] = [0, 0], knots: number = 2) {
        assert(knots >= 2, 'err: rope must have at least 2 knots');
        for (let i = 0; i < knots; i++) {
            this.knots.push([start[0], start[1]]);
        }
    }

    /**
     * Reset position of the rope.
     * @param {[number, number]} start - The start ubication of the rope.
     * @param {number} knots Number of knots.
     * @throws {Error} If knots is less than 2.
     */
    public reset(start: [number, number] = [0, 0], knots: number = 2): void {
        assert(knots >= 2, 'err: rope must have at least 2 knots');
        this.knots = [];
        for (let i = 0; i < knots; i++) {
            this.knots.push([start[0], start[1]]);
        }
    }

    /**
     * Get the head ubication of the rope.
     * @returns {[number, number]} The head ubication of the rope.
     */
    public getHead(): [number, number] {
        return this.knots[0];
    }

    /**
     * Get the tail ubication of the rope.
     * @returns {[number, number]} The tail ubication of the rope.
     */
    public getTail(): [number, number] {
        return this.knots[this.knots.length - 1];
    }

    /**
     * Get a certain knot of the rope.
     * @param {number} index - The index of the knot.
     * @returns {[number, number]} The knot ubication of the rope.
     * @throws {Error} If index is out of bounds.
     */
    public getKnot(index: number): [number, number] {
        assert(index >= 0 && index < this.knots.length, 'err: index out of bounds');
        return this.knots[index];
    }


    /**
     * Get knots of the rope.
     * @returns {Position[]} The knots of the rope.
     */
    public getKnots(): Position[] {
        return this.knots;
    }

    /**
     * Move the rope.
     * @param {Direction} direction - The direction to move.
     * @throws {Error} If length is negative.
     */
    public move(direction: Direction): void {
        switch (direction) {
            case 'U':
                this.getHead()[1] += 1;
                break;
            case 'D':
                this.getHead()[1] -= 1;
                break;
            case 'L':
                this.getHead()[0] -= 1;
                break;
            case 'R':
                this.getHead()[0] += 1;
                break;
        }
        this.updateKnots();
    }

    /**
     * Update the knots of the rope.
     */
    private updateKnots(): void {
        for(let i = 1; i < this.knots.length; i++) {
            this.updateKnot(i);
        }
    }

    /**
     * Update an specific knot of the rope.
     * @param {number} index - The index of the knot.
     * @throws {Error} If index is out of bounds.
     */
    private updateKnot(index: number): void {
        assert(index >= 0 && index < this.knots.length, 'err: index out of bounds');
        if (index === 0 || this.areKnotsAdyacent(this.knots[index], this.knots[index - 1])) {
            return;
        }
        let knot: Position = this.knots[index];
        let previousKnot: Position = this.knots[index - 1];
        let horizontalDistace: number = Math.abs(previousKnot[0] - knot[0]);
        let verticalDistance: number = Math.abs(previousKnot[1] - knot[1]);
        if (horizontalDistace > verticalDistance) {
            if (previousKnot[1] > knot[1]) {
                knot[1] = knot[1] + verticalDistance ;
            } else {
                knot[1] = knot[1] - verticalDistance;
            }
            if(previousKnot[0] > knot[0]) {
                knot[0] = knot[0] + horizontalDistace - 1;
            } else {
                knot[0] = knot[0] - horizontalDistace + 1;
            }
        } else if (horizontalDistace < verticalDistance) {
            if (previousKnot[0] > knot[0]) {
                knot[0] = knot[0] + horizontalDistace;
            } else {
                knot[0] = knot[0] - horizontalDistace;
            }
            if (previousKnot[1] > knot[1]) {
                knot[1] = knot[1] + verticalDistance - 1;
            } else {
                knot[1] = knot[1] - verticalDistance + 1;
            }
        } else {
            if (previousKnot[0] > knot[0]) {
                knot[0] = knot[0] + horizontalDistace - 1;
            } else {
                knot[0] = knot[0] - horizontalDistace + 1;
            }
            if (previousKnot[1] > knot[1]) {
                knot[1] = knot[1] + verticalDistance - 1;
            } else {
                knot[1] = knot[1] - verticalDistance + 1;
            }
        }
    }
    
    /**
     * Check if a knot is adyacent to other knot.
     * @param {Position} knot - The knot to check.
     * @param {Position} otherKnot - The other knot to check.
     * @returns {boolean} True if the knot is adyacent to other knot.
     * */
    private areKnotsAdyacent(knot: Position, otherKnot: Position): boolean {
        return Math.abs(knot[0] - otherKnot[0]) <= 1 && Math.abs(knot[1] - otherKnot[1]) <= 1;
    }

    /**
     * Print rope information.
     */
    public print(): void {
        for(let i = 0; i < this.knots.length; i++) {
            console.log(`Knot ${i}: ${this.knots[i]}`);
        }
        console.log();
    }

}