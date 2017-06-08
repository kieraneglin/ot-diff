"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Buffer = (function () {
    function Buffer() {
        this.queue = [];
    }
    Buffer.prototype.push = function (transform) {
        this.queue.push(transform);
        return this.queue;
    };
    Buffer.prototype.merge = function () {
        var previousTransform;
        for (var _i = 0, _a = this.queue.reverse(); _i < _a.length; _i++) {
            var transform = _a[_i];
            if (previousTransform) {
                transform.nextTransform = previousTransform;
                this.queue = [transform];
            }
            previousTransform = transform;
        }
    };
    return Buffer;
}());
exports.Buffer = Buffer;
