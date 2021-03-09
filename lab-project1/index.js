"use strict";
var App = /** @class */ (function () {
    function App() {
        var _this = this;
        this.setsData = document.querySelector('#sets-data');
        this.inputs = [];
        this.inputValues = [];
        this.sum = document.querySelector('#sum');
        this.avr = document.querySelector('#avr');
        this.min = document.querySelector('#min');
        this.max = document.querySelector('#max');
        this.sumValue = 0;
        this.avrValue = 0;
        this.minValue = 0;
        this.maxValue = 0;
        this.error = false;
        this.errorIcon = document.createElement('span');
        this.getValuesOperateAndAssign = function () {
            var _a, _b, _c;
            _this.sumValue = 0;
            _this.getValues();
            if (!_this.error) {
                if ((_a = document.querySelector('#error-element')) === null || _a === void 0 ? void 0 : _a.firstElementChild)
                    (_b = document.querySelector('#error-element')) === null || _b === void 0 ? void 0 : _b.removeChild(_this.errorIcon);
                _this.inputValues.forEach(function (value) {
                    _this.sumValue += value;
                });
                _this.avrValue = _this.sumValue / _this.howManyNumbers;
                _this.minValue = Math.min.apply(null, _this.inputValues);
                _this.maxValue = Math.max.apply(null, _this.inputValues);
                _this.assignElements(_this.sumValue, _this.avrValue, _this.minValue, _this.maxValue);
            }
            else {
                (_c = document.querySelector('#error-element')) === null || _c === void 0 ? void 0 : _c.appendChild(_this.errorIcon);
                _this.assignEmptys();
            }
        };
        this.errorIcon.classList.add("icon-error-alt");
        this.createInputs();
        this.listenInputs();
    }
    App.prototype.createInputs = function () {
        var _a, _b, _c, _d;
        this.error = true;
        this.howManyNumbers = +document.querySelector('#how-many-numbers').value;
        var startButton = document.querySelector('#start-button');
        var howManyNumbersInput = document.querySelector('#how-many-numbers');
        (_b = (_a = document.querySelector('#start-button')) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.removeChild(startButton);
        (_d = (_c = document.querySelector('#how-many-numbers')) === null || _c === void 0 ? void 0 : _c.parentElement) === null || _d === void 0 ? void 0 : _d.removeChild(howManyNumbersInput);
        for (var i = 0; i < this.howManyNumbers; i++) {
            var newInput = document.createElement('input');
            newInput.type = "number";
            this.inputs.push(newInput);
            this.setsData.appendChild(newInput);
        }
    };
    App.prototype.getValues = function () {
        this.inputValues = [];
        for (var i = 0; i < this.howManyNumbers; i++) {
            if (this.inputs[i].value == "") {
                this.error = true;
                break;
            }
            else {
                this.error = false;
                this.inputValues.push(+this.inputs[i].value);
            }
        }
    };
    App.prototype.assignElements = function (_sum, _avr, _min, _max) {
        this.sum.value = _sum.toString();
        this.avr.value = _avr.toString();
        this.min.value = _min.toString();
        this.max.value = _max.toString();
    };
    App.prototype.assignEmptys = function () {
        this.sum.value = "";
        this.avr.value = "";
        this.min.value = "";
        this.max.value = "";
    };
    App.prototype.listenInputs = function () {
        var _this = this;
        for (var inputNumber = 0; inputNumber < this.howManyNumbers; inputNumber++) {
            this.inputs[inputNumber].addEventListener('input', function () { return _this.getValuesOperateAndAssign(); });
        }
    };
    return App;
}());
var startApp = function () {
    var app = new App();
};
