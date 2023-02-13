/**
 * Class CRT
 * @class CRT
 * @param {string} sprite - Sprite
 */
export class CRT {
    private sprite: string;
    private crt: string[][];

    /**
     * Constructor
     * @constructor CRT
     * @param {string} sprite - Sprite
     */
    constructor(sprite: string) {
        this.sprite = sprite;
        this.crt = [];
    }

    /**
     * Get sprite
     * @returns {string} Sprite
     * */
    public getSprite(): string {
        return this.sprite;
    }

    /**
     * Get CRT
     * @returns {string[][]} CRT
     */
    public getCRT(): string[][] {
        return this.crt;
    }

    /**
     * Reset CRT
     * @param {string} sprite - Sprite
     */
    public reset(sprite: string): void {
        this.sprite = sprite;
        this.crt = [];
    }

    /**
     * Add row to CRT
     * @private addRow
     */
    private addRow(): void {
        this.crt.push(new Array(this.sprite.length).fill('.'));
    }

    /**
     * Draw a pixel at a specific position
     * @param {number} pos - Position
     */
    public draw(pos: number): void {
        let rowPos: number = Math.floor(pos / this.sprite.length);
        let colPos: number = pos % this.sprite.length;

        while (this.crt.length <= rowPos) {
            this.addRow();
        }
        
        if (this.sprite[colPos] === '#') {
            this.crt[rowPos][colPos] = '#';
        } else {
            this.crt[rowPos][colPos] = '.';
        }
    }

    /**
     * Update sprite
     * @param {string} sprite - Sprite
     * @throws {Error} If sprite is not valid
     */
    public updateSprite(sprite: string): void {
        if (sprite.length !== this.sprite.length) {
            throw new Error('err: sprite length is not valid');
        }
        this.sprite = sprite;
    }

    /**
     * Print CRT
     * @public print
     * */
    public print(): void {
        for (let i = 0; i < this.crt.length; i++) {
            for (let j = 0; j < this.crt[i].length; j++) {
                if (this.crt[i][j] === '#') {
                    // Print white spaces
                    process.stdout.write('\u001b[47m \u001b[0m');
                } else {
                    process.stdout.write('.');
                }
            }
            process.stdout.write('\n');
        }
    }

};