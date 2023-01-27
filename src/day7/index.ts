import { existsSync, readFileSync } from "fs";
import { argv, exit } from "process";

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

/**
 * Directory class
 * @class Directory
 * @property {string} name Name of the directory
 * @property {Set<File | Directory>} content Files | Directories in the directory
 */
export class Directory {
    /**
     * Constructor
     * @param route Route of the directory
     * @param content Files | Directories in the directory
     */
    constructor(public route: string, public content: Set<File | Directory> = new Set<File | Directory>()) {}

    /**
     * Get name of the directory
     * @returns Name of the directory
     */
    public getName(): string {
        if (this.route == '/') {
            return 'root';
        } else {
            let route: string[] = this.route.split('/');
            return route[route.length - 1];
        }
    }

    /**
     * Get the size of the directory
     * @returns Size of the directory
     */
    public getSize(): number {
        let size: number = 0;
        this.content.forEach((element: File | Directory) => {
            if (element instanceof File) {
                size += element.size;
            } else {
                size += element.getSize();
            }
        });
        return size;
    }

    /**
     * Add file or directory to the directory
     * @param element File or directory to add
     * @returns True if the element was added, false if not
     */
    public add(element: File | Directory): boolean {
        if (this.content.has(element)) {
            return false;
        } else {
            this.content.add(element);
            return true;
        }
    }

    /**
     * Find file or directory in the directory
     * @param name Name of the file or directory to find
     * @returns File or directory if found, undefined if not
     */
    public find(name: string): File | Directory | undefined {
        let found: File | Directory | undefined;
        this.content.forEach((element: File | Directory) => {
            if (element instanceof File && element.name === name) {
                found = element;
            } else if (element instanceof Directory && element.getName() === name) {
                found = element;
            }
        });
        return found;
    }

    /**
     * Get parent directory name
     * @returns Name of the parent directory if exists, undefined if not
     */
    public getParentName(): string | undefined {
        if (this.route == '/') {
            return undefined;
        } else {
            let route: string[] = this.route.split('/');
            route.pop();
            if (route.length == 1) {
                return 'root';
            } else {
                return route[route.length - 1];
            }
        }
    }

    /**
     * Print content of the directory
     * @param level Level of the directory
     */
    public print(level: number = 0): void {
        // not implemented yet
    }
}

/**
 * Check if line is a command
 * @param line Line to check
 */
export function isCommand(line: string): boolean {
    return line.startsWith('$');
}

// Create the root directory
let root: Directory = new Directory("root");

// Read input content
let input: string = argv[2];
let lines: string[] = [];

if (!existsSync(input)) {
    console.error('err: file does not exist');
} else {
    lines = readFileSync(input).toString().split(/\r?\n/);
}

// Set of Directories
let directories: Set<Directory> = new Set<Directory>([root]);

// Actual directory
let actualDirectory: Directory = root;

// Read lines
for (let i: number = 0; i < lines.length; i++) {
    let line: string = lines[i];
    if (isCommand(line)) {
        switch(line.split(' ')[1]) {
            case 'cd':
                let name: string = line.split(' ')[2];
                if (name === '..') {
                    let parentName: string | undefined = actualDirectory.getParentName();
                    if (parentName) {
                        let hasChanged: boolean = false;
                        directories.forEach((directory: Directory) => {
                            if (directory.getName() === parentName && directory.route + '/' + actualDirectory.getName() == actualDirectory.route) {
                                actualDirectory = directory;
                                hasChanged = true;
                            }
                        });
                        if (!hasChanged) {
                            console.error('err: parent directory of "' + name + '" not found');
                            exit(1);
                        }
                    } else {
                        console.error('err: root has no parent');
                        exit(1);
                    }
                    break;
                } else {
                    let directory: Directory | File | undefined = actualDirectory.find(name);
                    if (directory instanceof Directory) {
                        actualDirectory = directory;
                    } else {
                        console.error('err: directory "' + name + '" not found');
                        directories.forEach((directory: Directory) => {
                            console.log(directory.getName());
                        });
                        exit(1);
                    }
                }
                break;
            case 'ls':
                do {
                    i++;
                    line = lines[i];
                    if (line.split(' ')[0] == 'dir') {
                        let name: string = line.split(' ')[1];
                        let route: string = actualDirectory.route + '/' + name;
                        if (actualDirectory.route == '/') {
                            route = actualDirectory.route + name;
                        }
                        let directory: Directory = new Directory(route);
                        actualDirectory.add(directory);
                        directories.add(directory);
                    } else {
                        let name: string = line.split(' ')[1];
                        let size: number = +line.split(' ')[0];
                        let file: File = new File(name, size);
                        actualDirectory.add(file);
                    }
                } while(i + 1 < lines.length && lines[i+1].split(' ')[0] != '$');
                break;
            default:
                console.error('err: command not found');
                exit(1);
        }
    }
}

// Sum of all directories sizes with total size of at most 100000
let totalSize: number = 0;
directories.forEach((directory: Directory) => {
    if (directory.getSize() <= 100000) {
        totalSize += directory.getSize();
    }
});

console.log(totalSize);