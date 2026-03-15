const HA_URL = window.HA_URL
const HA_TOKEN = window.HA_TOKEN
const HEADERS = {
    "Authorization": `Bearer ${HA_TOKEN}`,
    "Content-Type": "application/json"
}

// Common function
async function fetchAllStates() {
    const response = await fetch(`${HA_URL}/api/states`, {headers: HEADERS});
    return await response.json();
}

// Common object creation
function mapEntity(entity) {
    return {
        id: entity.entity_id,
        name: entity.attributes.friendly_name,
        isActive: entity.state === "on",
    }
}

async function getEntityByType(type) {
    const data = await fetchAllStates();
    return data.filter(e => e.entity_id.startsWith(`${type}.`)).map(mapEntity)
}

export const getAllLights = () => getEntityByType("light")
export const getAllSensors = () => getEntityByType("sensor")
export const getAllSwitches = () => getEntityByType("switch")

// Toggle Light on & off
export async function toggleLight(entityId, isActive) {
    const service = isActive ? "turn_off" : "turn_on"
    await fetch(`${HA_URL}/api/services/light/${service}`, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify({entity_id: entityId}),
    })
}