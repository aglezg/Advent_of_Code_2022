import { assert } from "console";
import { existsSync, readFileSync } from "fs";
import { argv } from "process";

export type Direction = 'up' | 'down' | 'left' | 'right';

/**
 * Class representing a rope.
 * @class Rope
 * @property {[number, number]} start - The start ubication of the rope.
 * @property {[number, number]} head - The head ubication of the rope.
 * @property {[number, number]} tail - The tail ubication of the rope.
 */
class Rope {

    private head: [number, number] = this.start;
    private tail: [number, number] = this.start;

    /**
     * Create a rope.
     * @param {[number, number]} start - The start ubication of the rope.
     */
    constructor(public start: [number, number] = [0, 0]) {}

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
     * @param {number} length - The length to move the rope.
     */
    public move(direction: Direction, length: number): void {
        switch (direction) {
            case 'up':
                this.head[1] -= length;  // Falta actualizar la cola y comprobar si esto esta bien
                break;
            case 'down':
                this.head[1] += length;
                break;
            case 'left':
                this.head[0] -= length;
                break;
            case 'right':
                this.head[0] += length;
                break;
        }
    }

}


/**
 * Class representing a map.
 * @class Map
 * @property {[number, number]} horizontalSize - The horizontal size of the map.
 * @property {[number, number]} verticalSize - The vertical size of the map.
 */
class Map {

    /**
     * Create a map.
     * @param {[number, number]} horizontalSize - The horizontal size of the map.
     * @param {[number, number]} verticalSize - The vertical size of the map.
     */
    constructor(private horizontalSize: [number, number], private verticalSize: [number, number]) {
        assert(horizontalSize[0] <= horizontalSize[1] && verticalSize[0] <= verticalSize[1], 'err: size definition is incorrect');
    }

    /**
     * Get horizontal size of the map.
     * @returns {[number, number]} The horizontal size of the map.
     */
    public getHorizontalSize(): [number, number] {
        return this.horizontalSize;
    }

    /**
     * Get vertical size of the map.
     * @returns {[number, number]} The vertical size of the map.
     */
    public getVerticalSize(): [number, number] {
        return this.verticalSize;
    }

    /**
     * Set horizontal size of the map.
     * @param {[number, number]} horizontalSize - The horizontal size of the map.
     */
    public setHorizontalSize(horizontalSize: [number, number]): void {
        assert(horizontalSize[0] <= horizontalSize[1], 'err: horizontal size definition is incorrect');
        this.horizontalSize = horizontalSize;
    }

    /**
     * Set vertical size of the map.
     * @param {[number, number]} verticalSize - The vertical size of the map.
     */
    public setVerticalSize(verticalSize: [number, number]): void {
        assert(verticalSize[0] <= verticalSize[1], 'err: vertical size definition is incorrect');
        this.verticalSize = verticalSize;
    }

    /**
     * Increase the size of the map.
     * @param Direction The direction to increase the size of the map.
     * @param length The length to increase the size of the map.
     */
    public increaseSize(direction: Direction, length: number): void {
        switch (direction) {
            case 'up':
                this.verticalSize[0] -= length;
                break;
            case 'down':
                this.verticalSize[1] += length;
                break;
            case 'left':
                this.horizontalSize[0] -= length;
                break;
            case 'right':
                this.horizontalSize[1] += length;
                break;
        }
    }

    /**
     * Decrease the size of the map.
     * @param Direction The direction to decrease the size of the map.
     * @param length The length to decrease the size of the map.
     */
    public decreaseSize(direction: Direction, length: number): void {
        switch (direction) {
            case 'up':
                this.verticalSize[0] += length;
                assert(this.verticalSize[0] <= this.verticalSize[1], 'err: vertical size cant be decreased');
                break;
            case 'down':
                this.verticalSize[1] -= length;
                assert(this.verticalSize[0] <= this.verticalSize[1], 'err: vertical size cant be decreased');
                break;
            case 'left':
                this.horizontalSize[0] += length;
                assert(this.horizontalSize[0] <= this.horizontalSize[1], 'err: horizontal size cant be decreased');
                break;
            case 'right':
                this.horizontalSize[1] -= length;
                assert(this.horizontalSize[0] <= this.horizontalSize[1], 'err: horizontal size cant be decreased');
                break;
        }
    }

}

// Read input content
let input: string = argv[2];
let lines: string[] = [];

if (!existsSync(input)) {
    console.error('err: file does not exist');
} else {
    lines = readFileSync(input).toString().split(/\r?\n/);
}

console.log(lines);