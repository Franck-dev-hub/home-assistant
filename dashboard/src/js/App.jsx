import {useState, useEffect} from "react";

import {getLights, getSwitches} from "./api/getEntity.jsx"
import getWeather from "./api/getWeather.jsx"
import LightCard from "./components/LightCard.jsx";
import SwitchCard from "./components/SwitchCard.jsx";
import Header from "./components/Header.jsx";

import "../css/card.css";

export default function App() {
    const [weather, setWeather] = useState(null);
    const [lights, setLights] = useState([]);
    const [switches, setSwitches] = useState([]);

    useEffect(() => {
        getWeather().then(data => setWeather(data));
        getLights().then(data => setLights(data))
        getSwitches().then(data => setSwitches(data))
    }, []);

    return (
        <div>
            <Header weather={weather}/>
            <LightCard lights={lights}/>
            <SwitchCard switches={switches}/>
        </div>
    );
}
