import axios from "axios";

export default async function getWeather() {
    const url = "https://api.open-meteo.com/v1/forecast?latitude=43.1716&longitude=1.3806&current_weather=true";

    try {
        const response = await axios.get(url);
        const data = response.data;

        return {
            temp: data.current_weather.temperature,
            wind: data.current_weather.windspeed,
            code: data.current_weather.weathercode
        };
    } catch (error) {
        console.log("Weather error", error);
        return null;
    }
}