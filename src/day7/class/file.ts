/**
 * File class
 * @class File
 * @property {string} name Name of the file
 * @property {number} size Size of the file
 */
export class File {
    /**
     * Constructor
     * @param name Name of the file
     * @param size Size of the file
     */
    constructor(public name: string, public size: number) {}
}
