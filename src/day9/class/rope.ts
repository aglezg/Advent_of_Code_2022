import { Direction } from '../types/direction';

/**
 * Class representing a rope.
 * @class Rope
 * @property {[number, number]} head - The head ubication of the rope.
 * @property {[number, number]} tail - The tail ubication of the rope.
 */
export class Rope {

    private head: [number, number] = [0, 0];
    private tail: [number, number] = [0, 0];

    /**
     * Create a rope.
     * @param {[number, number]} start - The start ubication of the rope.
     */
    constructor(start: [number, number] = [0, 0]) {
        this.head[0] = start[0];
        this.head[1] = start[1];
        this.tail[0] = start[0];
        this.tail[1] = start[1];
    }

    /**
     * Reset position of the rope.
     * @param {[number, number]} start - The start ubication of the rope.
     */
    public reset(start: [number, number] = [0, 0]): void {
        this.head[0] = start[0];
        this.head[1] = start[1];
        this.tail[0] = start[0];
        this.tail[1] = start[1];
    }

    /**
     * Get the head ubication of the rope.
     * @returns {[number, number]} The head ubication of the rope.
     */
    public getHead(): [number, number] {
        return this.head;
    }

    /**
     * Get the tail ubication of the rope.
     * @returns {[number, number]} The tail ubication of the rope.
     */
    public getTail(): [number, number] {
        return this.tail;
    }

    /**
     * Move the rope.
     * @param {Direction} direction - The direction to move the rope.
     */
    public move(direction: Direction): void {
        switch (direction) {
            case 'U':
                this.head[1] += 1;
                break;
            case 'D':
                this.head[1] -= 1;
                break;
            case 'L':
                this.head[0] -= 1;
                break;
            case 'R':
                this.head[0] += 1;
                break;
        }
        this.UdateTail(direction);
    }

    /**
     * Udate tail position
     * @param {Direction} direction - The direction to move the rope.
     */
    public UdateTail(direction: Direction): void {
        if (!this.isTailAdyacent()) {
            switch (direction) {
                case 'U':
                    this.tail[0] = this.head[0];
                    this.tail[1] = this.head[1] - 1;
                    break;
                case 'D':
                    this.tail[0] = this.head[0];
                    this.tail[1] = this.head[1] + 1;
                    break;
                case 'L':
                    this.tail[0] = this.head[0] + 1;
                    this.tail[1] = this.head[1];
                    break;
                case 'R':
                    this.tail[0] = this.head[0] - 1;
                    this.tail[1] = this.head[1];
                    break;
            }
        }
    }

    /**
     * Check if head is adyacent to tail.
     * @returns {boolean} True if head is adyacent to tail, false otherwise.
     * */
    private isTailAdyacent(): boolean {
        return Math.abs(this.head[0] - this.tail[0]) <= 1 && Math.abs(this.head[1] - this.tail[1]) <= 1;
    }

    /**
     * Print the rope.
     * */
    public print(): void {
        console.log(`Head: ${this.head}`);
        console.log(`Tail: ${this.tail}\n`);
    }

}