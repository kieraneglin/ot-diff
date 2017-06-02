import { Transform } from './interfaces/transform';
export declare class Diff {
    private newStr;
    private oldStr;
    private raw?;
    private changeStart;
    private changeFromEnd;
    private changeEndIndexNew;
    private changeEndIndexOld;
    private charsAdded;
    private charsRemoved;
    diff(oldStr: string, newStr: string, raw?: boolean): Transform;
    private _changeStart(oldStr, newStr);
    private _changeFromEnd(oldStr, newStr, changeStart);
    private _payload();
}
export declare let OtDiff: Diff;
