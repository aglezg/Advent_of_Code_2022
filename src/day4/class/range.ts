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
}