# 1) Introduction

![Weather.ly App](/preview/preview.jpg)
The Weather.ly app is a submission for a Full Stack Engineer Test with the goal of completing a fully integrated weather-retrieval application within 24 hours.

1. The user is able to perform a search by providing "Country" and "City" as input fields
2. The request is sent to the backend server, which takes the longitude and latitude parameters forwards it to Open Weather Map API.
3. The backend server processes the response from the API call and returns a formatted response to the client.
4. The weather information is displayed to the user, and a search record is saved locally, allowing user to make a request again for the same country and city.

## Frontend

|            | Description                                      |
| ---------- | ------------------------------------------------ |
| Tech stack | NextJS, Tailwind/MUI, Axios, Typescript          |
| Port       | 3000                                             |
| Libraries  | https://www.npmjs.com/package/country-state-city |

1. User will not be able to submit as long as country is not specified.

2. User is allowed to proceed if country is specified, even if city isn't. In such a case, the geolocation will be derived from the country alone.

## Backend

|            | Description                      |
| ---------- | -------------------------------- |
| Tech stack | FastAPI, Request, Prisma ORM     |
| Port       | 8000                             |
| Endpoints  | GET /weather, GET /searchHistory |

1. FastAPI also hosts swagger doc at /docs.

## Database

|      | Description |
| ---- | ----------- |
| ORM  | Prisma      |
| Port | 5432        |

1. There is only one schema at the moment `search` for logging of search requests.

## Sequence Diagram

```
sequenceDiagram
    Client->>WeatherlyBackend: GET ("/weather")
    activate WeatherlyBackend
    WeatherlyBackend->>OpenWeatherApi: GET ("/data/2.5/weather")
    alt Success
        OpenWeatherApi->>WeatherlyBackend: {"main":..., "weather":...}
        WeatherlyBackend->>Client: {"message":"ok","payload":{...}}
        deactivate WeatherlyBackend
    else Fail to retrieve weather data
        break Weatherly fails to get data from OpenWeatherApi
            OpenWeatherApi-->WeatherlyBackend: [Error]
            WeatherlyBackend-->Client: HTTP Status 500
        end
    end
```

# 2) Project Setup

The project was dockerised into containers with the docker-compose.yml file can be found in the root folder.

You will need to install docker on your machine before you can continue with the following steps.

## Disclaimer: Unable to get app working with Docker

**Note**: I'm having problems getting frontend to communicate with the backend. The request successfully runs via curl using the http://backend:8000 url (service name for the backend), but fails when using the same url from the front end UI. If this doesn't work for you, you'll have to follow the lengthier step that doesn't use docker-compose (sorry! I've been trying to fix this for hours to no avail!)

Things I've tried:

- Specifying the ports when running the commands
- Using the production mode for both frontend and backend
- Encapsulating urls in double quotes
- Tried changing to localhost to make sure it fails (which did so successfully)
- Tried requesting via the docker container itself using exec (worked)
- Tried changing the Postgres connection string to make sure i've gotten it correct (codes run in localhost outside docker)
- Eyeballing the API for GET requests on frontend and backend
- Pruning docker services/containers/networks etc and reinstalling docker

Things I have not tried:

- Using something other than axios

## Building and running the application

1. You will need to include the .env files for the frontend and backend server to successfully run the docker commands. Comment the env.sample files to use the non-localhost configurations, rename the file to .env.

2. Run `docker-compose build` followed by `docker-compose up` at the root directory.

3. Access the application at https://localhost:3000/

## If that doesn't work for you:

These steps are not ideal because they do not fulfill the docker setup requirements, but is a last resort.

1. Navigate to the `/frontend` folder

2. Fill in the `.env` file using the localhost configurations.

3. Install dependencies using the `npm i` command

4. Once dependencies have been installed, run the frontend server on dev mode `npm run dev`

5. Run the dockerised PostgresDB. `docker-compose up db`

6. Navigate to `/backend` folder

7. Fill in the `.env` file with the localhost configurations.

8. Make sure you have pip installed and run the command `pip install -r requirements.txt` to install the dependencies.

9. Make the updates to the database to sync the schema `prisma db push`

10. Run the FastAPI backend server ` fastapi dev main.py`

# 3) User Story

**Persona**: Alex is a working professional who relies on weather updates to plan his daily commute and outdoor activities.

**Acceptance Criteria:**

| Criteria        | Description                                                                                                                                                                    |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Location        | Users can enter their location (country or Country AND City) to get weather information.                                                                                       |
| Weather Details | The app displays current minimum and maximum temperature in Celsius, weather conditions (e.g., cloudy, rainy), humidity in %, wind speed, description of the weather and time. |
| User Interface  | The information is presented in a clear and visually appealing manner. Weather condition is color coded.                                                                       |
| Accuracy        | Weather information is fetched from a reliable weather API and updated regularly to ensure accuracy.                                                                           |

# 4) Project Planning

| Phase   | Description                                 |
| ------- | ------------------------------------------- |
| Phase 1 | Frontend code, backend mock API             |
| Phase 2 | Backend code, frontend SearchHistory update |
| Phase 3 | UI Design                                   |
| Phase 4 | Dockerising images and documentation        |

# 5) Assumptions and Considerations

| Assumptions                                                                                                                               | Rationale                                                                                                                            |
| ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Longitude and Latitude are generated on the frontend side via library                                                                     |                                                                                                                                      |
| User is able to make searches using only country field, even if city field is missing                                                     | Not all countries have a city listed                                                                                                 |
| Countries and Cities information are presented to user as autocomplete field                                                              | Reduce user frustration and requests to the server to check if country and city exists                                               |
| Search history should be saved in the localStorage                                                                                        | The application does not provide user authentication or authorization                                                                |
| Database usage is for logging searches                                                                                                    | Since we are not authenticating or authorizing users, search results are logged for monitoring purposes/data analytics/other reasons |
| Weather Open API returns weather data as an array                                                                                         | Only the first result is taken                                                                                                       |
| Weather Open API returns a dt field that does not translate into the local time                                                           | Local DateTime will be taken from either backend or frontend server to be displayed to user                                          |
| If user did not include City infomation, it will default to country and country code.                                                     | Not all countries have a city listed.                                                                                                |
| The response payload is saved in a payload field as JSON                                                                                  | Payloads can change over time. Ideally, MongoDB can be considered.                                                                   |
| When user searches using previous search history, they are requesting for the new weather information and not the past weather condition. | User only wants new information. Also, user information is not persisted.                                                            |

# 6) Known Bugs

Fixed date time on UI, some responsive problems, etc....
