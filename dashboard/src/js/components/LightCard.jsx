import {useState} from "react";
import {Lightbulb, LightbulbOff} from "lucide-react";

import {toggleLight} from "../api/HomeAssistant.jsx"

import "../../css/light.css";

export default function LightCard({entity}) {
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
        <div className={`light-item ${active ? "on" : ""}`}
             onClick={handleClick}>
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