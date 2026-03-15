import {useState, useEffect} from "react";

import {getAllLights} from "./api/HomeAssistant.jsx"

import LightCard from "./components/LightCard.jsx";
import Header from "./components/Header.jsx";

const HA_URL = window.HA_URL
const HA_TOKEN = window.HA_TOKEN
const HEADERS = {
    "Authorization": `Bearer ${HA_TOKEN}`,
    "Content-Type": "application/json"
}

export default function App() {
    const [lights, setLights] = useState([]);

    useEffect(() => {
        getAllLights().then(data => setLights(data))
    }, []);

    return (
        <div>
            <Header/>
            <div className="main-card">
                <h2 className="light-h2">Lumières</h2>
                <div className="lights-grid">
                    {lights.map(entity => (
                        <LightCard key={entity.id} entity={entity} headers={HEADERS} haUrl={HA_URL}/>
                    ))}
                </div>
            </div>
        </div>
    );
}