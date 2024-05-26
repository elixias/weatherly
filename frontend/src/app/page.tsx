'use client'
import { useEffect, useState } from "react";
import useSearchHistory from "./lib/useSearchHistory";
import { ISearchHistory, IWeatherData, TGeolocation } from "./lib/types";
import SearchBar from "./ui/SearchBar/SearchBar";
import axios from "axios";
import { backendUrl } from "./lib/environment";
import WeatherCard from "./ui/WeatherCard/WeatherCard";
import SearchHistory from "./ui/SearchHistory/SearchHistory";
import { AppBar, ThemeProvider, Typography } from "@mui/material";
import { theme } from "./theme";
import Link from "next/link";


export default function Home() {

    const { searchHistory, addSearchHistory, deleteSearchHistory, clearSearchHistory } = useSearchHistory();
    const [weatherDetails, updateWeatherDetails] = useState<IWeatherData>();

    const getDateTimeNow = () => {
        return new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
        });
    }

    const callWeatherApi = async (geolocation: TGeolocation) => {
        try {
            const response = await axios.get(`${backendUrl}/weather`, {
                params: {
                    ...geolocation,
                    units: "metric"
                }
            });
            const reviewedWeatherData: ISearchHistory = {
                ...geolocation,
                datetime: getDateTimeNow()
            }
            if (response.data.payload === undefined)
                throw new Error(response.data.message)
            addSearchHistory(reviewedWeatherData)
            updateWeatherDetails(response.data)
        } catch (error) {
            console.error("There was an error fetching the weather data!", error);
        }
    }

    return (
        <>
            <ThemeProvider theme={theme}>

                <div className="flex flex-col items-center space-y-10 h-screen">

                    <div className="text-center">
                        <p className="text-9xl font-sans font-bold gradient-text pt-10">WEATHER.LY</p>
                        <p>Stay in touch with the latest weather updates</p>
                    </div>

                    <div className="w-1/3 h-300">
                        {
                            (weatherDetails !== undefined) ?
                                <WeatherCard weatherData={weatherDetails} />
                                : null

                        }
                    </div>

                    <div className="w-3/5">
                        <SearchBar callWeatherApi={callWeatherApi} />
                    </div>

                    <div className="w-3/5 pb-10">
                        <SearchHistory searchHistory={searchHistory} callWeatherApi={callWeatherApi} deleteSearchHistory={deleteSearchHistory} />
                    </div>

                    <Link href="https://github.com/elixias">@github.com/elixias</Link>

                    <div className="p-5"></div>

                </div>

            </ThemeProvider >
        </>
    );
}
