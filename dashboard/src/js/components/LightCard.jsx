import {useState} from "react";
import {Lightbulb, LightbulbOff} from "lucide-react";

import {toggleLight} from "../api/toggleEntity.jsx"

import "../../css/light.css";
import "../../css/toggle.css";

function LightItem({entity}) {
    const [active, setActive] = useState(entity.isActive);

    async function handleClick() {
        setActive(!active)
        try {
            await toggleLight(entity.id, active)
        } catch (e) {
            setActive(active)
        }
    }

    return (
        <div className={`light-item ${active ? "on" : ""}`} onClick={handleClick}>
            <div className="light-item-left">
                <div className="light-icon">
                    {active
                        ? <Lightbulb color="var(--light-accent)" size={34}/>
                        : <LightbulbOff color="var(--muted)" size={34}/>
                    }
                </div>
                <div className="light-name">{entity.name}</div>
                <div className="light-state">{active ? "ON" : "OFF"}</div>
            </div>
            <div className="light-item-right">
                <div className={`toggle ${active ? "on" : ""}`}>
                    <div className="toggle-knob"></div>
                </div>
            </div>
        </div>
    );
}

export default function LightCard({lights}) {
    return (
        <div className="main-card">
            <h2 className="card-h2">Lumières</h2>
            <div className="cards-grid">
                {lights.map(entity => (
                    <LightItem key={entity.id} entity={entity}/>
                ))}
            </div>
        </div>
    );
}