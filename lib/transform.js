"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Transform = (function () {
    function Transform() {
    }
    Transform.toInt = function (transformObj) {
        var transform = new Transform();
        for (var _i = 0, _a = ['start', 'remove']; _i < _a.length; _i++) {
            var attribute = _a[_i];
            if (transformObj[attribute]) {
                transform[attribute] = Number(transformObj[attribute]);
            }
        }
        return transform;
    };
    return Transform;
}());
exports.Transform = Transform;
