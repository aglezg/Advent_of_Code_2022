export type Direction = "N" | "S" | "E" | "W";

/**
 * Class MAP
 * @param matrix Map of tree with them heigths
 */
export class Map {
  constructor(public matrix: number[][]) {}

  public isVisible(i: number, j: number) {
    if (this.isExtreme(i, j)) {
      return true;
    } else {
      return this.isVisibleFrom(i, j, "N") || this.isVisibleFrom(i, j, "S")
        || this.isVisibleFrom(i, j, "E") || this.isVisibleFrom(i, j, "W");
    }
  }

  public getScore(i: number, j: number): number {
    return this.getScoreFrom(i, j, "N") * this.getScoreFrom(i, j, "S") *
      this.getScoreFrom(i, j, "E") * this.getScoreFrom(i, j, "W");
  }

  private getScoreFrom(i: number, j: number, dir: Direction): number {
    let score: number = 0;
    switch(dir) {
      case "N":
        for (let a: number = i - 1; a >= 0; a--)
          if (this.matrix[a][j] < this.matrix[i][j]) {
            score++;
          } else if (this.matrix[a][j] == this.matrix[i][j]) {
            score ++;
            break;
          } else {
            score++;
            break;
          }
        break;
      case "S":
        for (let a: number = i + 1; a < this.matrix.length; a++)
          if (this.matrix[a][j] < this.matrix[i][j]) {
            score++;
          } else if (this.matrix[a][j] == this.matrix[i][j]) {
            score ++;
            break;
          } else {
            score++;
            break;
          }
        break;
      case "E":
        for (let a: number = j + 1; a < this.matrix[i].length; a++)
          if (this.matrix[i][a] < this.matrix[i][j]) {
            score++;
          } else if (this.matrix[i][a] == this.matrix[i][j]) {
            score ++;
            break;
          } else {
            score++;
            break;
          }
        break;
      case "W":
        for (let a: number = j - 1; a >= 0; a--)
          if (this.matrix[i][a] < this.matrix[i][j]) {
            score++;
          } else if (this.matrix[i][a] == this.matrix[i][j]) {
            score ++;
            break;
          } else {
            score++;
            break;
          }
        break;
    }
    return score;
  }

  private isExtreme(i: number, j: number): boolean {
    if (i == 0 || j == 0 || i == this.matrix.length - 1 || j == this.matrix[i].length - 1) {
      return true;
    } else {
      return false;
    }
  }

  private isVisibleFrom(i: number, j: number, dir: Direction): boolean {
    if (this.isExtreme(i, j)) {
      return true;
    } else {
      switch(dir) {
        case "N":
          for (let a: number = i - 1; a >= 0; a--) {
            if (this.matrix[a][j] >= this.matrix[i][j]) {
              return false;
            }
          }
          return true;
        case "S":
          for (let a: number = i + 1; a < this.matrix.length; a++) {
            if (this.matrix[a][j] >= this.matrix[i][j]) {
              return false;
            }
          }
          return true;
        case "E":
          for (let a: number = j + 1; a < this.matrix[i].length; a++) {
            if (this.matrix[i][a] >= this.matrix[i][j]) {
              return false;
            }
          }
          return true;
        case "W":
          for (let a: number = j - 1; a >= 0; a--) {
            if (this.matrix[i][a] >= this.matrix[i][j]) {
              return false;
            }
          }
          return true;
      }
    }
  }
}