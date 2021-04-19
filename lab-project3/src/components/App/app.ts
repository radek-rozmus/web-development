import { City } from "../City/City";
import { Weather, k2c } from "../../types/Weather";

export class App {
  opwApiKey = "3cc750bd101b9db44c2f711d4c46b211";

  root: HTMLDivElement;
  header: HTMLDivElement;
  wrapper: HTMLDivElement;

  addCityInput: HTMLInputElement;
  addCityButton: HTMLButtonElement;

  inputWrapper: HTMLDivElement;
  communicate: HTMLDivElement;

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

    this.inputWrapper = document.querySelector(
      ".input-wrapper"
    ) as HTMLDivElement;
    this.addCityInput = document.querySelector(
      ".add-city-input"
    ) as HTMLInputElement;
    this.addCityInput.addEventListener("keydown", event => {
      if (event.keyCode === 13) {
        this.addCity();
      }
    });

    this.addCityButton = document.querySelector(
      ".add-city-button"
    ) as HTMLButtonElement;
    this.communicate = document.querySelector(".communicate") as HTMLDivElement;

    this.addCityButton.onclick = () => {
      this.addCity();
    };
    setInterval(() => this.renderCities(), 600000);
  }
  addCity = () => {
    const cityName = this.addCityInput.value;
    this.addCityInput.value = "";
    const weather = this.getWeather(cityName, this.opwApiKey, true);
    const city = new City(cityName, this.wrapper, weather, this);
    this.cities.push(city);
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

  async getWeather(
    name: string,
    key: string,
    mode: boolean
  ): Promise<Weather>{
    const openWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${name}&APPID=${key}`;
    const weatherResponse = await fetch(openWeatherUrl).then((response) => {
      if (response.ok) {
        if(mode) {
          this.cityNames.push(name);
          this.saveData(this.cityNames);
          this.communicate.innerText = ``
        };
        return response;
      } else {
        this.communicate.innerText = `Nie znaleziono ${name}.`;
        throw Error(`Nie znaleziono ${name}.`);
      }
    });
    const weatherData = await weatherResponse.json();
    const weatherObject: Weather = {
      temperature: k2c(weatherData.main.temp),
      description: weatherData.weather[0].main,
      pressure: weatherData.main.pressure,
      humidity: weatherData.main.humidity,
    };

    return weatherObject;
  }

  renderCities() {
    console.log("render");
    this.wrapper.innerHTML = "";
    this.cityNames.forEach((cityName) => {
      const weather = this.getWeather(cityName, this.opwApiKey, false);
      const newCity = new City(cityName, this.wrapper, weather, this);
      this.cities.push(newCity);
    });
  }
}
