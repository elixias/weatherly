import { ICity, ICountry } from "country-state-city";

export interface ILocation {
    city: ICity | null;
    country: ICountry | null;
}

export type TGeolocation = {
    country: string
    city?: string
    longitude: string
    latitude: string
}

export interface IWeatherData {
    message: string
    payload: {
        country: string
        city: string
        main: string
        description: string
        temp_min: number
        temp_max: number
        humidity: number
        datetime: number
        icon: string
    }
}

export interface ISearchHistory extends TGeolocation {
    datetime: string
}