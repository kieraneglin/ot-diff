import { Transform } from './transform';
export default class Diff {
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
    private getChangeStart(oldStr, newStr);
    private getChangeFromEnd(oldStr, newStr, changeStart);
    private payload();
}
