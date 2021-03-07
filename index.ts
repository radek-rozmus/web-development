class App
{
num1: HTMLInputElement;
num2: HTMLInputElement;
num3: HTMLInputElement;
num4: HTMLInputElement;

sum: HTMLInputElement;
avr: HTMLInputElement;
min: HTMLInputElement;
max: HTMLInputElement;

num1Value: number;
num2Value: number;
num3Value: number;
num4Value: number;

sumValue: number;
avrValue: number;
minValue: number;
maxValue: number;

constructor(){
    this.getElements();
    this.listenInputs();
    debugger
}

getElements = () => {
    this.num1 = document.querySelector('#num1');
    this.num2 = document.querySelector('#num2');
    this.num3 = document.querySelector('#num3');
    this.num4 = document.querySelector('#num4');

    this.sum = document.querySelector('#sum');
    this.avr = document.querySelector('#avr');
    this.min = document.querySelector('#min');
    this.max = document.querySelector('#max');

    this.num1Value = +this.num1.nodeValue;
    this.num2Value = +this.num2.nodeValue;
    this.num3Value = +this.num3.nodeValue;
    this.num4Value = +this.num4.nodeValue;
}

operateAndAssign = () => {
    this.sumValue = this.num1Value + this.num2Value + this.num3Value + this.num4Value;
    this.avrValue = this.sumValue/4;
    this.minValue = Math.min(this.num1Value, this.num2Value, this.num3Value, this.num4Value);
    this.maxValue = Math.max(this.num1Value, this.num2Value, this.num3Value, this.num4Value);
    this.assignElements();
}

assignElements()
{
    this.sum.value = this.sumValue.toString();
    this.avr.value = this.avrValue.toString();
    this.min.value = this.minValue.toString();
    this.max.value = this.maxValue.toString();
}

listenInputs(){
    this.num1.addEventListener('input', () => this.operateAndAssign());
    this.num2.addEventListener('input', () => this.operateAndAssign());
    this.num3.addEventListener('input', () => this.operateAndAssign());
    this.num4.addEventListener('input', () => this.operateAndAssign());
}


}

const app: App = new App();