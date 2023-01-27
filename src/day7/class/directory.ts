import { File } from "./file";

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
        this.content.forEach((element: File | Directory) => {
            if (element instanceof File) {
                console.log(' '.repeat(level) + element.name + ' (' + element.size + ' bytes)');
            } else {
                console.log(' '.repeat(level) + element.getName() + ' (' + element.getSize() + ' bytes)');
                element.print(level + 1);
            }
        });
    }
}