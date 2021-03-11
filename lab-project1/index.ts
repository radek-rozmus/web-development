class App
{
howManyNumbers!: number;
setsData: HTMLDivElement = document.querySelector('#sets-data') as HTMLDivElement;
inputs: HTMLInputElement[] = [];
inputValues: number[] = [];
buttons: HTMLButtonElement[] = [];

sum: HTMLInputElement = document.querySelector('#sum') as HTMLInputElement;
avr: HTMLInputElement = document.querySelector('#avr') as HTMLInputElement;
min: HTMLInputElement = document.querySelector('#min') as HTMLInputElement;
max: HTMLInputElement = document.querySelector('#max') as HTMLInputElement;

sumValue: number = 0;
avrValue: number = 0;
minValue: number = 0;
maxValue: number = 0;

error: boolean = false;
errorIcon: HTMLSpanElement = document.createElement('span');

constructor(){
    this.errorIcon.setAttribute("title", "Uzupełnij wszystkie pola wartościami liczbowymi.");
    this.errorIcon.classList.add("icon-error-alt");
    this.createInputs();
    this.listenInputs()
}

createInputs(){

    this.error = true;
    this.howManyNumbers = +(document.querySelector('#how-many-numbers') as HTMLInputElement).value;

    const startButton: HTMLButtonElement = document.querySelector('#start-button') as HTMLButtonElement;
    const howManyNumbersInput: HTMLInputElement = document.querySelector('#how-many-numbers') as HTMLInputElement;

    document.querySelector('#start-button')?.parentElement?.removeChild(startButton);
    document.querySelector('#how-many-numbers')?.parentElement?.removeChild(howManyNumbersInput);

    for(let i: number = 0; i < this.howManyNumbers; i++)
    { 
        const newDiv: HTMLDivElement = document.createElement('div');
        const newInput: HTMLInputElement = document.createElement('input');
        const newButton: HTMLButtonElement = document.createElement('button');

        newInput.type = "number";
        newButton.textContent = "X";
        newButton.onclick = () => {
            const i: number = this.inputs.indexOf(newInput);
            const b: number = this.buttons.indexOf(newButton);

            this.inputs.splice(i, 1);
            this.inputValues.splice(i, 1);
            this.buttons.splice(b, 1);

            newDiv.removeChild(newInput);
            newDiv.removeChild(newButton);

            this.howManyNumbers -= 1;
            this.getValuesOperateAndAssign();
        };

        this.inputs.push(newInput);
        this.buttons.push(newButton);

        newDiv.appendChild(newButton);
        newDiv.appendChild(newInput);

        this.setsData.appendChild(newDiv);
    }
}


getValues(){
    this.inputValues = [];
    for(let i: number = 0; i < this.howManyNumbers; i++)
    {
        if(this.inputs[i].value == "")
        {
            this.error = true;
            break;
        }
        else
        {
            this.error = false;
            this.inputValues.push(+this.inputs[i].value);
        }
    }

}

getValuesOperateAndAssign = () => {
    
    this.sumValue=0;
    this.getValues();

    if(!this.error)
    {
    if(document.querySelector('#error-element')?.firstElementChild) document.querySelector('#error-element')?.removeChild(this.errorIcon);

    this.inputValues.forEach(value => {
        this.sumValue += value;
    });

    this.avrValue = this.sumValue/this.howManyNumbers;

    this.minValue = Math.min.apply(null, this.inputValues); 
    this.maxValue = Math.max.apply(null, this.inputValues); 

    this.assignElements(this.sumValue, this.avrValue, this.minValue, this.maxValue);
}
else{
document.querySelector('#error-element')?.appendChild(this.errorIcon);
this.assignEmptys();
}
}

assignElements(_sum: number, _avr: number, _min: number, _max:number)
{
    this.sum.value = _sum.toString();
    this.avr.value = _avr.toString();
    this.min.value = _min.toString();
    this.max.value = _max.toString();
}

assignEmptys()
{
    this.sum.value = "";
    this.avr.value = "";
    this.min.value = "";
    this.max.value = "";
}

listenInputs(){
    for(let inputNumber: number = 0; inputNumber < this.howManyNumbers; inputNumber++)
    {
    this.inputs[inputNumber].addEventListener('input', () => this.getValuesOperateAndAssign());
    }
}
}

const startApp = () => {
const app = new App();
}
