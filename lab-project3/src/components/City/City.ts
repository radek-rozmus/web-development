import { App } from "../App/App";
import { Weather} from "../../types/Weather";


export class City {
  name: string;
  tile: HTMLDivElement;
  removeButton: HTMLDivElement;
  app: App;
  weatherExtracted: Promise<Weather>

  constructor(
    name: string,
    where: HTMLDivElement,
    weather: Promise<Weather>,
    app: App
  ) {
    this.name = name;
    this.app = app;
    this.weatherExtracted = weather;
    this.tileInit(where);
  }

  async tileInit(where: HTMLDivElement) {
    this.tile = document.createElement("div");
    this.tile.classList.add("city-tile");

    const tileTitle = document.createElement("div");
    tileTitle.classList.add("tile-title");
    tileTitle.innerText = this.name;

    const tileDescription = document.createElement("div");
    tileDescription.classList.add("tile-description");
    tileDescription.innerText = (await this.weatherExtracted).description;

    const tileTemperature = document.createElement("div");
    tileTemperature.classList.add("tile-temperature");
    tileTemperature.innerHTML = (await this.weatherExtracted).temperature.toFixed(1) + '&deg;' + 'C';
    if((await this.weatherExtracted).temperature<0){
      tileTemperature.classList.add("minus-temperature");
    }else{
      tileTemperature.classList.add("plus-temperature");
    }

    const tilePressure = document.createElement("div");
    tilePressure.classList.add("tile-pressure");
    tilePressure.innerHTML = 'Ciśnienie: ' + (await this.weatherExtracted).pressure + ' hPa';

    const tileHumilidity = document.createElement("div");
    tileHumilidity.classList.add("tile-humilidity");
    tileHumilidity.innerHTML = 'Wilgotność: ' + (await this.weatherExtracted).humidity + '%';

    //remove button
    this.removeButton = document.createElement("div");
    this.removeButton.classList.add("remove-button");
    this.removeButton.innerText = "X";
    this.removeButton.onclick = () => {
      this.app.wrapper.innerHTML = "";
      const index = this.app.cityNames.indexOf(this.name);
      this.app.cityNames.splice(index, 1);
      console.log(this.app.cityNames);
      this.app.saveData(this.app.cityNames);
      this.app.renderCities();
    };//-----

    this.tile.appendChild(tileTitle);
    this.tile.appendChild(tileDescription);
    this.tile.appendChild(tileTemperature);
    this.tile.appendChild(tilePressure);
    this.tile.appendChild(tileHumilidity);
    this.tile.appendChild(this.removeButton);
    where.appendChild(this.tile);
  }
}
