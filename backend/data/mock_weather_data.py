mock_response = {
  "coord": {
    "lon": 103.82,
    "lat": 1.35
  },
  "weather": [
    {
      "id": 803,
      "main": "Clouds",
      "description": "broken clouds",
      "icon": "04d"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 304.96,
    "feels_like": 311.96,
    "temp_min": 303.54,
    "temp_max": 306.01,
    "pressure": 1009,
    "humidity": 68
  },
  "visibility": 10000,
  "wind": {
    "speed": 3.6,
    "deg": 160
  },
  "clouds": {
    "all": 75
  },
  "dt": 1716700830,
  "sys": {
    "type": 2,
    "id": 265582,
    "country": "SG",
    "sunrise": 1716677777,
    "sunset": 1716721655
  },
  "timezone": 28800,
  "id": 1880755,
  "name": "Bright Hill Crescent",
  "cod": 200
}

def get_mock_data():
    return mock_response