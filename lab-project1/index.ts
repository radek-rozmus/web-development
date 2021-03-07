class App
{
num1!: HTMLInputElement;
num2!: HTMLInputElement;
num3!: HTMLInputElement;
num4!: HTMLInputElement;

sum!: HTMLInputElement;
avr!: HTMLInputElement;
min!: HTMLInputElement;
max!: HTMLInputElement;

num1Value!: number;
num2Value!: number;
num3Value!: number;
num4Value!: number;

sumValue!: number;
avrValue!: number;
minValue!: number;
maxValue!: number;

constructor(){
    this.getElements();
    this.listenInputs();
}

getElements = () => {

    this.num1 = document.querySelector('#num1') as HTMLInputElement;
    this.num2 = document.querySelector('#num2') as HTMLInputElement;
    this.num3 = document.querySelector('#num3') as HTMLInputElement;
    this.num4 = document.querySelector('#num4') as HTMLInputElement;

    this.sum = document.querySelector('#sum') as HTMLInputElement;
    this.avr = document.querySelector('#avr') as HTMLInputElement;
    this.min = document.querySelector('#min') as HTMLInputElement;
    this.max = document.querySelector('#max') as HTMLInputElement;

    this.num1Value = +this.num1.value;
    this.num2Value = +this.num2.value;
    this.num3Value = +this.num3.value;
    this.num4Value = +this.num4.value;
}

getElementsOperateAndAssign = () => {

    this.getElements();

    this.sumValue = this.num1Value + this.num2Value + this.num3Value + this.num4Value;
    this.avrValue = this.sumValue/4;
    this.minValue = Math.min(this.num1Value, this.num2Value, this.num3Value, this.num4Value);
    this.maxValue = Math.max(this.num1Value, this.num2Value, this.num3Value, this.num4Value);

    this.assignElements(this.sumValue, this.avrValue, this.minValue, this.maxValue);
}

assignElements(_sum: number, _avr: number, _min: number, _max:number)
{
    this.sum.value = _sum.toString();
    this.avr.value = _avr.toString();
    this.min.value = _min.toString();
    this.max.value = _max.toString();
}

listenInputs(){
    this.num1.addEventListener('input', () => this.getElementsOperateAndAssign());
    this.num2.addEventListener('input', () => this.getElementsOperateAndAssign());
    this.num3.addEventListener('input', () => this.getElementsOperateAndAssign());
    this.num4.addEventListener('input', () => this.getElementsOperateAndAssign());
}


}

const app = new App();