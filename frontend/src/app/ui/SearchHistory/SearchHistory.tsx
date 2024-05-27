import { ISearchHistory, TGeolocation } from '@/app/lib/types';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { Button, Icon, IconButton, Paper } from '@mui/material';
const SearchHistory = ({ searchHistory, deleteSearchHistory, callWeatherApi, clearSearchHistory }: {
    searchHistory: ISearchHistory[],
    deleteSearchHistory: (index: number) => void,
    clearSearchHistory: () => void,
    callWeatherApi: (geolocation: TGeolocation) => Promise<void>
}) => {

    return (
        <div className="w-full">

            <Paper elevation={3} className="p-5 flex flex-col ">

                <div className="mb-5 flex">
                    <p className="font-sans font-medium text-lg">Search History</p>
                    <Button className="ml-auto" onClick={clearSearchHistory}>Clear All</Button>
                </div>

                {
                    searchHistory.map((search, index) => {
                        return (
                            <div key={index} className="p-3 flex hover:bg-gray-100 hover:cursor-pointer rounded-md items-center">

                                <p className="mr-auto">{index + 1}. {search.city}, {search.country} {search.datetime}</p>

                                <IconButton
                                    onClick={
                                        () => {
                                            callWeatherApi(search)
                                        }
                                    }
                                >
                                    <SearchIcon />
                                </IconButton>

                                <IconButton
                                    onClick={
                                        () => {
                                            deleteSearchHistory(index)
                                        }
                                    }
                                >
                                    <DeleteIcon />
                                </IconButton>

                            </div>
                        )
                    })
                }

            </Paper>

        </div>
    )
}

export default SearchHistory