"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cursor = (function () {
    function Cursor() {
    }
    Cursor.prototype.preserve = function (element) {
        this.selection = {
            start: element.selectionStart,
            end: element.selectionEnd,
            element: element
        };
    };
    Cursor.prototype.restore = function (transform) {
        this[transform.action](this.selection, transform);
    };
    Cursor.prototype.insert = function (transform) {
        if (transform.start < this.selection.start) {
            this.selection.element.selectionStart = this.selection.start + transform.payload.length;
            this.selection.element.selectionEnd = this.selection.end + transform.payload.length;
        }
        else if (transform.start >= this.selection.start && transform.start < this.selection.end) {
            this.selection.element.selectionStart = this.selection.start;
            this.selection.element.selectionEnd = this.selection.end + transform.payload.length;
        }
        else {
            this.selection.element.selectionStart = this.selection.start;
            this.selection.element.selectionEnd = this.selection.end;
        }
    };
    return Cursor;
}());
exports.Cursor = Cursor;
