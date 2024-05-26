import { IWeatherData } from '@/app/lib/types'
import { Box, Card, CardContent } from '@mui/material'
import clsx from 'clsx';
import { url } from 'inspector';
import { ReactNode } from 'react';

const Wrapper: React.FC<{ label: string, children: ReactNode }> = ({ label, children }) => {
    return (
        <div className="flex-4 mr-5" >
            <label className="text-xs font-medium text-gray-600">{label}</label>
            {children}
        </div>
    );
}

function WeatherCard({ weatherData }: { weatherData: IWeatherData }) {
    const payload = weatherData.payload
    return (
        <Card className="w-full h-full flex flex-row">

            <div className="p-5 flex-4/5">

                <p className="mb-3 text-lg font-medium text-cyan-600">
                    {/* <div className="h-30 w-30 bg-cover" style={{ backgroundImage: `url(https://openweathermap.org/img/wn/${payload.icon}@2x.png)` }} /> */}
                    {payload.city}, {payload.country}
                </p>

                <Wrapper label="Description"><p>{payload.description}</p></Wrapper>

                <Wrapper label="Temperature"><p>{payload.temp_min}~{payload.temp_max}</p></Wrapper>

                <Wrapper label="Humidity"><p>{payload.humidity}</p></Wrapper>

                <Wrapper label="Time">
                    <p>
                        {
                            new Date(payload.datetime).toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                                hour12: true,
                            })
                        }
                    </p>
                </Wrapper>

            </div>

            <div className={
                clsx("h-full w-full flex text-center justify-center items-center",
                    {
                        "bg-[#01232a]": payload.main === "Thunderstorm",
                        "bg-[#025769]": payload.main === "Rain",
                        "bg-[#03aed2]": payload.main === "Drizzle",
                        "bg-[#81d7e9]": payload.main === "Snow",
                        "bg-[#e6f7fb]": payload.main === "Clouds",
                    }
                )
            }>

                {/* <div className="h-full w-full bg-cover" style={{ backgroundImage: `url("https://i.ytimg.com/vi/HsQlpaYTE0s/maxresdefault.jpg")` }} /> */}

                <p className={
                    clsx("font-sans text-3xl font-bold",
                        {
                            "text-[#e6f7fb]": ["Thunderstorm", "Drizzle", "Rain"].includes(payload.main),
                            "text-[#03aed2]": ["Snow", "Clouds"].includes(payload.main)
                        }
                    )}>
                    {payload.main}
                </p>

            </div>

        </Card>
    )
}

export default WeatherCard