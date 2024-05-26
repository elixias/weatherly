import { Alert, Autocomplete, Button, Icon, IconButton, Paper, Snackbar, TextField } from '@mui/material';
import React, { ReactNode, useState } from 'react'
import { Country, City, ICountry, ICity } from 'country-state-city';
import { ILocation, TGeolocation } from '@/app/lib/types';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ callWeatherApi }: {
    callWeatherApi: (geolocation: TGeolocation) => void
}) => {
    const defaultLocation: ILocation = { city: null, country: null }
    const defaultSearchError = { open: false, error: "" }
    const [searchLocation, updateSearchLocation] = useState<ILocation>(defaultLocation);
    const [cities, updateCities] = useState<ICity[]>([]);
    const [searchError, updateSearchError] = useState<{ open: boolean, error: string }>(defaultSearchError)

    let countries = Country.getAllCountries()

    const getWeatherDetails = () => {

        //check to make sure Country is set in searchLocation, note that not all countries have cities
        if (searchLocation.country === null) {
            updateSearchError({ open: true, error: "Please select a country!" })
            return
        }

        closeSearchError()

        // use city's geolocation, else fallback to the country's geolocation
        // const { longitude, latitude } = searchLocation.city || searchLocation.country //might not be safe to use this code
        const country = searchLocation.country.isoCode
        const city = searchLocation.city?.name || searchLocation.country.name
        const longitude = searchLocation.city?.longitude || searchLocation.country.longitude
        const latitude = searchLocation.city?.latitude || searchLocation.country.latitude

        //call the weather api with the long and lat details
        callWeatherApi({ country, city, longitude, latitude })
    }

    const updateCountry = (event: object, country: ICountry | null) => {
        //filter the cities based on the country
        closeSearchError()

        if (country !== null) {
            updateCities(
                City.getCitiesOfCountry(country.isoCode) || []
            )
        } else {
            updateCities([])
        }

        updateSearchLocation((prev) => ({
            'country': country,
            'city': null //reset cities
        }))
    }

    const updateCity = (event: object, value: ICity | null) => {
        updateSearchLocation((prev) => ({
            ...prev,
            'city': value
        }))
    }

    const clearSearch = () => {
        updateSearchLocation(defaultLocation)
    }

    const closeSearchError = () => {
        updateSearchError(defaultSearchError)
    }

    return (
        <div className="w-full">

            <Paper elevation={3} className="p-5 flex flex-col">

                <div className="font-sans font-medium text-lg mb-5">Check today&apos;s weather</div>

                <div className="w-full flex flex-row space-x-5">
                    <Autocomplete
                        disablePortal
                        id="country"
                        options={countries}
                        getOptionLabel={(option) => option?.name}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Countries" />}
                        value={searchLocation?.country}
                        onChange={updateCountry}
                    />

                    {/* <LocationCityIcon fontSize="large" className="text-blue-600" /> */}
                    <Autocomplete
                        disablePortal
                        id="cities"
                        options={cities}
                        getOptionLabel={(option) => option?.name}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Cities" />}
                        value={searchLocation?.city}
                        onChange={updateCity}
                    />

                    <Button variant="contained" className="flex-2" onClick={getWeatherDetails} startIcon={<SearchIcon />}>Search</Button>

                    <Button variant="outlined" className="flex-2" onClick={clearSearch}>Clear</Button>

                </div>

                {
                    (searchError.open) ?
                        <Alert severity="error" className="font-sans font-medium text-lg mt-5">{searchError.error}</Alert>
                        : null
                }

            </Paper>

            {/* <Snackbar
                open={searchError.open}
                autoHideDuration={6000}
                onClose={() => { }}
                message={searchError.error}
                action={(
                    <Button color="primary" size="small" onClick={closeSearchError}>
                        Close
                    </Button>
                )}
            /> */}

        </div>
    )
}

export default SearchBar