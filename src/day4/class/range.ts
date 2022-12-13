import { assert } from "console";

export class Range {
  constructor(public first: number, public last: number) {
    assert(first <= last);
  }

  include(range: Range): boolean {
    if (this.first <= range.first && this.last >= range.last) {
      return true;
    }
    return false;
  }

  overlap(range: Range): boolean {
    if (this.include(new Range(range.first, range.first)) ||
    this.include(new Range(range.last, range.last))) {
      return true;
    } else if (range.include(new Range(this.first, this.first)) ||
    range.include(new Range(this.last, this.last))) {
      return true;
    }
    return false;
  }
}