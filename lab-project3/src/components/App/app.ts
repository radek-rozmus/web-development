import { City } from '../City/City';

export class App {
  opwApiKey = "3cc750bd101b9db44c2f711d4c46b211";

  root: HTMLDivElement;
  header: HTMLDivElement;
  wrapper: HTMLDivElement;

  addCityInput: HTMLInputElement;
  addCityButton: HTMLButtonElement;

  inputWrapper: HTMLDivElement;

  cityNames: string[] = [];
  cities: City[] = [];

  constructor() {
    this.initApp();
    this.cityNames = this.getData();
    this.renderCities();

  }

  initApp() {
    this.root = document.getElementById("root") as HTMLDivElement;
    this.header = document.querySelector(".header") as HTMLDivElement;
    this.wrapper = document.querySelector(".wrapper") as HTMLDivElement;

    this.inputWrapper = document.querySelector(".input-wrapper") as HTMLDivElement;
    this.addCityInput = document.querySelector(".add-city-input") as HTMLInputElement;
    this.addCityButton = document.querySelector(".add-city-button") as HTMLButtonElement;

    this.addCityButton.onclick = () => {
      const cityName = this.addCityInput.value;
      this.addCityInput.value = "";
      const city = new City(cityName, this.wrapper, "73a5f6b658c088a9f29cf8b6d4ce438e", this);
      this.cities.push(city);
      this.cityNames.push(cityName);
      this.saveData(this.cityNames);
    }
  }
  saveData(data: string[]) {
    localStorage.setItem("cityNames", JSON.stringify(data));
  }
  getData(): string[] {
    const data = localStorage.getItem("cityNames");
    if (data) {
      return JSON.parse(data);
    } else {
      return [];
    }
  }
  
  renderCities(){
    this.cityNames.forEach(cityName => {
      const newCity = new City(cityName, this.wrapper, "73a5f6b658c088a9f29cf8b6d4ce438e", this)
      this.cities.push(newCity);
    });
  }
}
