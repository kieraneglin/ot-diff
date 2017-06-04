"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Transform = (function () {
    function Transform() {
    }
    Transform.prototype.toInt = function () {
        var transform = new Transform();
        for (var _i = 0, _a = ['start', 'remove']; _i < _a.length; _i++) {
            var attribute = _a[_i];
            if (this[attribute]) {
                transform[attribute] = Number(this[attribute]);
            }
        }
        return transform;
    };
    return Transform;
}());
exports.Transform = Transform;
