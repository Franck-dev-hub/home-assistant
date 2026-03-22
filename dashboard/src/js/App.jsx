import {useState, useEffect} from "react";

import {getLights, getSwitches} from "./api/HomeAssistant.jsx"

import LightCard from "./components/LightCard.jsx";
import SwitchCard from "./components/SwitchCard.jsx";
import Header from "./components/Header.jsx";

import "../css/card.css";

const HA_URL = window.HA_URL
const HA_TOKEN = window.HA_TOKEN
const HEADERS = {
    "Authorization": `Bearer ${HA_TOKEN}`,
    "Content-Type": "application/json"
}

export default function App() {
    const [lights, setLights] = useState([]);
    const [switches, setSwitches] = useState([]);

    useEffect(() => {
        getLights().then(data => setLights(data))
        getSwitches().then(data => setSwitches(data))
    }, []);

    return (
        <div>
            <Header/>
            <div className="main-card">
                <h2 className="card-h2">Lumières</h2>
                <div className="cards-grid">
                    {lights.map(entity => (
                        <LightCard key={entity.id} entity={entity} headers={HEADERS} haUrl={HA_URL}/>
                    ))}
                </div>
            </div>
            <div className="main-card">
                <h2 className="card-h2">Prises</h2>
                <div className="cards-grid">
                    {switches.map(entity => (
                        <SwitchCard key={entity.id} entity={entity} headers={HEADERS} haUrl={HA_URL}/>
                    ))}
                </div>
            </div>
        </div>
    );
}