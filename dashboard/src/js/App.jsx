import {useState, useEffect} from "react";

import {getLights, getSwitches} from "./api/getEntity.jsx"

import LightCard from "./components/LightCard.jsx";
import SwitchCard from "./components/SwitchCard.jsx";
import Header from "./components/Header.jsx";

import "../css/card.css";

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
                        <LightCard key={entity.id} entity={entity} headers={window.HEADERS} haUrl={window.HA_URL}/>
                    ))}
                </div>
            </div>
            <div className="main-card">
                <h2 className="card-h2">Prises</h2>
                <div className="cards-grid">
                    {switches.map(entity => (
                        <SwitchCard key={entity.id} entity={entity} headers={window.HEADERS} haUrl={window.HA_URL}/>
                    ))}
                </div>
            </div>
        </div>
    );
}
