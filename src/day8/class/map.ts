export type Direction = "N" | "S" | "E" | "W";

/**
 * Class MAP
 * @param matrix Map of tree with them heigths
 */
export class Map {
  /**
   * Constructor
   * @param matrix Matrix with tree heights 
   */
  constructor(public matrix: number[][]) {}

  /**
   * Check if a Tree is lower than other
   * @param i 'i' position of first tree
   * @param j 'j' position of first tree
   * @param i2 'i' position of second tree
   * @param j2 'j' position of second tree
   * @returns True if first tree is lower than second tree
   */
  public isLower(i: number, j: number, i2: number, j2: number) {
    return this.matrix[i][j] < this.matrix[i2][j2];
  }

  /**
   * Check if a Tree is Visible
   * @param i 'i' position
   * @param j 'j' position
   * @returns True if its visible
   */
  public isVisible(i: number, j: number) {
    if (this.isExtreme(i, j)) {
      return true;
    } else {
      return this.isVisibleFrom(i, j, "N") || this.isVisibleFrom(i, j, "S")
        || this.isVisibleFrom(i, j, "E") || this.isVisibleFrom(i, j, "W");
    }
  }

  /**
   * Calculate the tree scored based on the proximity tree heights
   * @param i 'i' position of tree
   * @param j 'j' position of tree
   * @returns Return the score
   */
  public getScore(i: number, j: number): number {
    if (this.isExtreme(i, j)) {
      return 0;
    } else {
      return this.getScoreFrom(i, j, "N") * this.getScoreFrom(i, j, "S") *
        this.getScoreFrom(i, j, "E") * this.getScoreFrom(i, j, "W");
    }
  }

  /**
   * Get a tree score from an especific direction
   * @param i 'i' position of tree
   * @param j 'j' position of tree
   * @param dir Direction to use
   * @returns Score from that direction
   */
  private getScoreFrom(i: number, j: number, dir: Direction): number {
    let score: number = 0;
    if (this.isExtreme(i, j)) {
      return 0;
    } else {
      switch(dir) {
        case "N":
          for (let k: number = i - 1; k >= 0; k--)
            if (this.isLower(k, j, i, j)) {
              score++;
            } else {
              score++;
              break;
            }
          break;
        case "S":
          for (let a: number = i + 1; a < this.matrix.length; a++)
            if (this.isLower(a, j, i, j)) {
              score++;
            } else {
              score++;
              break;
            }
          break;
        case "E":
          for (let a: number = j + 1; a < this.matrix[i].length; a++)
            if (this.isLower(i, a, i, j)) {
              score++;
            } else {
              score++;
              break;
            }
          break;
        case "W":
          for (let a: number = j - 1; a >= 0; a--)
            if (this.isLower(i, a, i, j)) {
              score++;
            } else {
              score++;
              break;
            }
          break;
      }
      return score;
    }
  }

  /**
   * Determine if a tree is in a extreme position
   * @param i 'i' Position
   * @param j 'j' Position
   * @returns True if the tree is located in a extreme
   */
  private isExtreme(i: number, j: number): boolean {
    if (i == 0 || j == 0 || i == this.matrix.length - 1 || j == this.matrix[i].length - 1) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Check if a Tree is visible from one direction
   * @param i 'i' position
   * @param j 'j' position
   * @param dir Direction to check
   * @returns True if is visible from that direction
   */
  private isVisibleFrom(i: number, j: number, dir: Direction): boolean {
    if (this.isExtreme(i, j)) {
      return true;
    } else {
      switch(dir) {
        case "N":
          for (let k: number = i - 1; k >= 0; k--)
            if (!this.isLower(k, j, i, j))
              return false;
          return true;
        case "S":
          for (let k: number = i + 1; k < this.matrix.length; k++)
            if (!this.isLower(k, j, i, j))
              return false;
          return true;
        case "E":
          for (let k: number = j + 1; k < this.matrix[i].length; k++)
            if (!this.isLower(i, k, i, j))
              return false;
          return true;
        case "W":
          for (let k: number = j - 1; k >= 0; k--)
            if (!this.isLower(i, k, i, j))
              return false;
          return true;
      }
    }
  }
}