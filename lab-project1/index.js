"use strict";
var App = /** @class */ (function () {
    function App() {
        var _this = this;
        this.getElements = function () {
            _this.num1 = document.querySelector('#num1');
            _this.num2 = document.querySelector('#num2');
            _this.num3 = document.querySelector('#num3');
            _this.num4 = document.querySelector('#num4');
            _this.sum = document.querySelector('#sum');
            _this.avr = document.querySelector('#avr');
            _this.min = document.querySelector('#min');
            _this.max = document.querySelector('#max');
            _this.num1Value = +_this.num1.value;
            _this.num2Value = +_this.num2.value;
            _this.num3Value = +_this.num3.value;
            _this.num4Value = +_this.num4.value;
        };
        this.operateAndAssign = function () {
            _this.getElements();
            _this.sumValue = _this.num1Value + _this.num2Value + _this.num3Value + _this.num4Value;
            _this.avrValue = _this.sumValue / 4;
            _this.minValue = Math.min(_this.num1Value, _this.num2Value, _this.num3Value, _this.num4Value);
            _this.maxValue = Math.max(_this.num1Value, _this.num2Value, _this.num3Value, _this.num4Value);
            _this.assignElements(_this.sumValue, _this.avrValue, _this.minValue, _this.maxValue);
        };
        this.getElements();
        this.listenInputs();
    }
    App.prototype.assignElements = function (_sum, _avr, _min, _max) {
        this.sum.value = _sum.toString();
        this.avr.value = _avr.toString();
        this.min.value = _min.toString();
        this.max.value = _max.toString();
    };
    App.prototype.listenInputs = function () {
        var _this = this;
        this.num1.addEventListener('input', function () { return _this.operateAndAssign(); });
        this.num2.addEventListener('input', function () { return _this.operateAndAssign(); });
        this.num3.addEventListener('input', function () { return _this.operateAndAssign(); });
        this.num4.addEventListener('input', function () { return _this.operateAndAssign(); });
    };
    return App;
}());
var app = new App();
