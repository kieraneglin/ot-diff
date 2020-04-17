declare module "ot-diff" {
  class Diff {
    /**
     * Generates the diff.
     * @param oldString 
     * @param newString 
     * @param raw 
     */
    public diff(oldString: string, newString: string, raw?: boolean): OtDiff;

    /**
     * Applies a transform (`insert`, `delete`, `replace` or `noop`) based on the value of diff.action.
     */
    public transform(value: string, tramsform: OtDiff): string;
    public insert(value: string, tramsform: OtDiff): string;
    public delete(value: string, tramsform: OtDiff): string;
    public replace(value: string, tramsform: OtDiff): string;
    public noop(value: string, tramsform: OtDiff): string;
  }

  export interface IOtOpts {
    newString: string;
    oldString: string;
    raw: boolean;
    changeStart: number;
    changeFromEnd: number;
    changeEndIndexNew: number;
    changeEndIndexOld: number;
    charsAdded: number;
    charsRemoved: number;
  }

  export type OtDiff = ({
    action: 'insert',
    start: number,
    payload: string
  } | {
    action: 'delete',
    start: number,
    remove: number
  } | {
    action: 'replace',
    start: number,
    remove: number,
    payload: string
  } | {
    action: 'noop'
  }) & { opts?: IOtOpts };

  export default new Diff();
}
