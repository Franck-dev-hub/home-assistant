import {COMFORT_SENSORS} from "../config.js";
import {fetchStateIndex} from "../../../api/HomeAssistant.js";

export async function getComfort(key) {
    const sensors = COMFORT_SENSORS[key];
    if (!sensors) {
        return null;
    }

    const byId = await fetchStateIndex();
    const tempEntity = byId.get(sensors.tempSensor);
    const humidityEntity = byId.get(sensors.humiditySensor);
    if (!tempEntity || !humidityEntity) {
        return null;
    }

    const temp = parseFloat(tempEntity.state);
    const humidity = parseFloat(humidityEntity.state);
    if (Number.isNaN(temp) || Number.isNaN(humidity)) {
        return null;
    }

    const optional = id => {
        const value = parseFloat(byId.get(id)?.state);
        return Number.isNaN(value) ? null : value;
    };

    return {
        name: sensors.name,
        temp,
        humidity,
        co2: sensors.co2Sensor ? optional(sensors.co2Sensor) : null,
        voc: sensors.vocSensor ? optional(sensors.vocSensor) : null,
        formaldehyde: sensors.formaldehydeSensor ? optional(sensors.formaldehydeSensor) : null,
    };
}
