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
    return Cursor;
}());
