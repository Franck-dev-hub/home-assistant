import {useState} from "react";
import {Power, PowerOff} from "lucide-react";

import {toggleSwitch} from "../api/HomeAssistant.jsx"

import "../../css/switch.css";

export default function SwitchCard({entity}) {
    const [active, setActive] = useState(entity.isActive);

    async function handleClick() {
        setActive(!active)
        try {
            await toggleSwitch(entity.id, active)
        } catch (e) {
            setActive(active)
        }
    }

    return (
        <div className={`switch-item ${active ? "on" : ""}`}
             onClick={handleClick}>
            <div className="switch-item-left">
                <div className="switch-icon">
                    {active
                        ? <Power color="var(--switch-accent)" size={34}/>
                        : <PowerOff color="var(--muted)" size={34}/>
                    }
                </div>
                <div className="switch-name">{entity.name}</div>
                <div className="switch-state">{active ? "ON" : "OFF"}</div>
            </div>
            <div className="switch-item-right">
                <div className={`toggle ${active ? "on" : ""}`}>
                    <div className="toggle-knob"></div>
                </div>
            </div>
        </div>
    );
}