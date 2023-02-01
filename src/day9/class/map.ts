import { assert } from "console";
import { Direction } from "../types/direction";

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
            case 'U':
                this.verticalSize[0] -= length;
                break;
            case 'D':
                this.verticalSize[1] += length;
                break;
            case 'L':
                this.horizontalSize[0] -= length;
                break;
            case 'R':
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
            case 'U':
                this.verticalSize[0] += length;
                assert(this.verticalSize[0] <= this.verticalSize[1], 'err: vertical size cant be decreased');
                break;
            case 'D':
                this.verticalSize[1] -= length;
                assert(this.verticalSize[0] <= this.verticalSize[1], 'err: vertical size cant be decreased');
                break;
            case 'L':
                this.horizontalSize[0] += length;
                assert(this.horizontalSize[0] <= this.horizontalSize[1], 'err: horizontal size cant be decreased');
                break;
            case 'R':
                this.horizontalSize[1] -= length;
                assert(this.horizontalSize[0] <= this.horizontalSize[1], 'err: horizontal size cant be decreased');
                break;
        }
    }

}