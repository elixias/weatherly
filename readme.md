readme.md

# 1) Introduction

The Weather.ly app is a submission for a Full Stack Engineer Test with the goal of completing a fully integrated weather-retrieval application within 24 hours.

1. The user is able to perform a search by providing "Country" and "City" as input fields
2. The request is sent to the backend server, which takes the longitude and latitude parameters forwards it to Open Weather Map API.
3. The backend server processes the response from the API call and returns a formatted response to the client.
4. The weather information is displayed to the user, and a search record is saved locally, allowing user to make a request again for the same country and city.

## Frontend

|            |                                                  |
| ---------- | ------------------------------------------------ |
| Tech stack | NextJS, Tailwind/MUI, Axios, Typescript          |
| Port       | 3000                                             |
| Libraries  | https://www.npmjs.com/package/country-state-city |

## Backend

|            |                                  |
| ---------- | -------------------------------- |
| Tech stack | FastAPI, Request, Prisma ORM     |
| Port       | 8000                             |
| Endpoints  | GET /weather, GET /searchHistory |

## Database

|      |        |
| ---- | ------ |
| ORM  | Prisma |
| Port | 5432   |

# 2) Project Setup

The project was dockerised into containers with the docker-compose.yml file can be found in the root folder.

You will need to install docker on your machine before you can continue with the following steps.

## Building and running the application

Note: Apologies I have not been able to get the frontend and backend to successfully communicate at the docker level. Not sure if it has something to do with my local memory running out. Im still looking into it but in the meantime alternative steps need to be taken to run the app.

1. Navigate to the `/frontend` folder

2. Fill in the `.env` file

3. Install dependencies using the `npm i` command

4. Once dependencies have been installed, run the frontend server on dev mode `npm run dev`

5. Run the dockerised PostgresDB. `docker-compose up postgresdb`

6. Navigate to `/backend` folder

7. Fill in the `.env` file

8. Make sure you have pip installed and run the command `pip install -r requirements.txt` to install the dependencies.

9. Make the updates to the database `prisma db push`

10. run the FastAPI backend server `fastapi run dev`

## Building and running the application (Not working as of now)

1. You will need to include the .env files for the frontend and backend server to successfully run the docker commands.

2. Run `docker-compose build` followed by `docker-compose up` at the root directory.

3. Access the application at https://localhost:3000/

# 3) User Story

# 4) Requirements Planning

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
