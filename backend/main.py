# run the server with : fastapi dev main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from data.mock_weather_data import get_mock_data
from dotenv import load_dotenv
import os
import requests
import json
from prisma import Prisma
from contextlib import asynccontextmanager
import logging
import time

load_dotenv()
# db = Prisma()
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')

# @asynccontextmanager
# async def lifespan(app: FastAPI):
#     await db.connect()
#     yield
#     # Clean up
#     await db.disconnect()

app = FastAPI() #lifespan=lifespan

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],#os.getenv("FRONTEND_URL")
    allow_methods=["*"],
    allow_headers=["*"],
)

async def saveSearchRecord(status, country, city, longitude, latitude, payload):
    db = Prisma()
    await db.connect()
    await db.search.create(
        {
            "status": status,
            "country": country,
            "city": city,
            "longitude": longitude,
            "latitude":latitude,
            "payload": json.dumps(payload)
        }
    )
    await db.disconnect()

@app.get("/weather")
async def getWeather(country: str, longitude: str, latitude: str, city: str ):
    try:
        logging.debug(f"URL:{os.getenv('WEATHERAPI_URL')}")
        logging.debug(f"Lat:{latitude} Lon: {longitude}")
        logging.debug(f"appid:{os.getenv('WEATHERAPI_KEY')}")

        # make request to the api
        # weather = get_mock_data()

        weather = requests.get(
            os.getenv("WEATHERAPI_URL"),
            params={
                "lat": latitude,
                "lon": longitude,
                "appid": os.getenv("WEATHERAPI_KEY")
            }
        )

        payload = weather.json()

        # process the results
        simplifiedWeather = {
            "message": "ok",
            "payload":{
                "country": country,
                "city": city,
                "main": payload['weather'][0]['main'],
                "description": payload['weather'][0]['description'],
                "humidity":payload['main']['humidity'],
                "temp_min":payload['main']['temp_min'],
                "temp_max":payload['main']['temp_max'],
                "datetime":int(time.time()),#payload['dt'],
                "icon":payload['weather'][0]['icon']
            }
        }

        print(simplifiedWeather['payload'])

        # save the search in the db?
        await saveSearchRecord(True, country, city, longitude, latitude, simplifiedWeather['payload'])
        
        return simplifiedWeather
    except Exception as error:
        await saveSearchRecord(False, country, city, longitude, latitude, None)
        logging.error(error)
        return {"message":"There was an error fetching the requested data."}

@app.get("/searchHistory")
async def getSearchHistory():
    db = Prisma()
    await db.connect()
    history = await db.search.find_many(
        order= {
            "created_at": "desc",
        },
        take=10
    )
    await db.disconnct()
    return history