import { Transform } from './interfaces/transform';

class Cursor {
  private selection: object

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
    if(parseInt(transform.start) < cursor.start) {
      cursor.element.selectionStart = cursor.start + transform.payload.length;
      cursor.element.selectionEnd = cursor.end + transform.payload.length;
    } else if(parseInt(transform.start) >= cursor.start && parseInt(transform.start) < cursor.end) {
      cursor.element.selectionStart = cursor.start;
      cursor.element.selectionEnd = cursor.end + transform.payload.length;
    } else {
      cursor.element.selectionStart = cursor.start;
      cursor.element.selectionEnd = cursor.end;
    }
  }
}
