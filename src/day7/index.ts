import { existsSync, readFileSync } from "fs";
import { argv, exit } from "process";
import { Directory } from "./class/directory";
import { File } from "./class/file";

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

// Set of visited directories
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

// Limit directory size
let limit: number = 100000;

// Total size of all directories with total size of at most 'limit'
let totalSize: number = 0;

// Sum of all directories sizes with total size of at most 'limit'
directories.forEach((directory: Directory) => {
    if (directory.getSize() <= limit) {
        totalSize += directory.getSize();
    }
});

// Print total size
console.log("Total size > " + totalSize);