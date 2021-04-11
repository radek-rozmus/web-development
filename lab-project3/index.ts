export{};

class App{
root: HTMLDivElement = document.getElementById('root') as HTMLDivElement;

cityNameInput: HTMLInputElement = document.createElement('input');


constructor(){
 this.root.appendChild(this.cityNameInput);

}

}

const app = new App();