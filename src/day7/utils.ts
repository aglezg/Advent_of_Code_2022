import { Directory } from './class/directory';

/**
 * Check if line is a command
 * @param line Line to check
 */
export function isCommand(line: string): boolean {
    return line.startsWith('$');
}

/**
 * Select a directory to delete that will free up enough space
 * @param totalSpaceAvailable Total disk space available
 * @param unusedSpaceRequired Unused space required
 * @param totalSpaceUsed Total space used
 * @param directories Set of directories
 * @returns Directory to delete or undefined if there is sufficient space available
 */
export function selectDirectoryToDelete(totalSpaceAvailable: number, unusedSpaceRequired: number, totalSpaceUsed: number, directories: Set<Directory>): Directory | undefined{
    let availableSpace: number = totalSpaceAvailable - totalSpaceUsed;
    if (availableSpace < unusedSpaceRequired) {
        let directoryToDelete: Directory | undefined = undefined;
        let minSpace: number = Number.MAX_SAFE_INTEGER;
        directories.forEach((directory: Directory) => {
            if (directory.getSize() < minSpace && availableSpace + directory.getSize() >= unusedSpaceRequired) {
                minSpace = directory.getSize();
                directoryToDelete = directory;
            }
        });
        return directoryToDelete;
    } else {
        return undefined;
    }
}