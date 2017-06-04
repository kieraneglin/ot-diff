import { Transform } from './transform';

export default class Diff {
  // Lots of members because we need to pass lots of debugging data
  private newStr: string
  private oldStr: string
  private raw?: boolean
  private changeStart: number
  private changeFromEnd: number
  private changeEndIndexNew: number
  private changeEndIndexOld: number
  private charsAdded: number
  private charsRemoved: number

  public diff(oldStr: string, newStr: string, raw?:boolean): Transform {
    this.newStr = newStr;
    this.oldStr = oldStr;
    this.raw = raw;

    this.changeStart = this.getChangeStart(oldStr, newStr);
    this.changeFromEnd = this.getChangeFromEnd(oldStr, newStr, this.changeStart);

    this.changeEndIndexNew = newStr.length - this.changeFromEnd;
    this.changeEndIndexOld = oldStr.length - this.changeFromEnd;

    this.charsAdded = this.changeEndIndexNew - this.changeStart;
    this.charsRemoved = this.changeEndIndexOld - this.changeStart;

    return this.payload();
  }

  private getChangeStart(oldStr: string, newStr: string): number {
    let start: number = 0;
    // Doesn't use TS/ES2015 sugar, but it's 20x faster that for..in.
    while (start < oldStr.length && start < newStr.length && oldStr[start] == newStr[start]) {
      start++;
    }
    return start;
  }

  private getChangeFromEnd(oldStr: string, newStr: string, changeStart: number): number {
    let end: number = 0;
    while (end < oldStr.length &&
      end < newStr.length &&
      oldStr.length - end > changeStart &&
      newStr.length - end > changeStart &&
      oldStr[oldStr.length - 1 - end] == newStr[newStr.length - 1 - end]) {
      end++;
    }
    return end;
  }

  private payload(): Transform {
    let transform: Transform = new Transform;

    if(this.charsRemoved === 0 && this.charsAdded > 0) {
      transform.action= 'insert';
      transform.start= this.changeStart;
      transform.payload = this.newStr.slice(this.changeStart, this.changeEndIndexNew);
    } else if(this.charsRemoved > 0 && this.charsAdded === 0) {
      transform.action = 'delete';
      transform.start = this.changeStart;
      transform.remove = this.charsRemoved;
    } else if(this.charsRemoved > 0 && this.charsAdded > 0) {
      transform.action = 'replace';
      transform.start = this.changeStart;
      transform.remove = this.charsRemoved;
      transform.payload = this.newStr.substr(this.changeStart, this.charsAdded);
    } else {
      transform.action ='noop'
    }

    if(this.raw) {
      transform.raw = this;
    }
    
    return transform;
  }
}
