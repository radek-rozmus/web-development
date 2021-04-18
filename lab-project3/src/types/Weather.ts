export type Weather = {
    temperature: number,
    description: string,
    pressure: number,
    humidity: number
}

  
export const k2c = (k:number):number => {
    return k - + 273.15;
  }