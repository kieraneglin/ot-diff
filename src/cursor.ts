import { Transform } from './interfaces/transform';
import { Selection } from './interfaces/selection';

export class Cursor {
  private selection: Selection

  public preserve(element: HTMLInputElement): void {
    this.selection = {
      start: element.selectionStart,
      end: element.selectionEnd,
      element: element
    };
  }
  public restore(transform: Transform): void {
    this[transform.action](this.selection, transform);
  }
  public insert(transform: Transform): void {
    if(transform.start < this.selection.start) {
      this.selection.element.selectionStart = this.selection.start + transform.payload.length;
      this.selection.element.selectionEnd = this.selection.end + transform.payload.length;
    } else if(transform.start >= this.selection.start && transform.start < this.selection.end) {
      this.selection.element.selectionStart = this.selection.start;
      this.selection.element.selectionEnd = this.selection.end + transform.payload.length;
    } else {
      this.selection.element.selectionStart = this.selection.start;
      this.selection.element.selectionEnd = this.selection.end;
    }
  }
}
