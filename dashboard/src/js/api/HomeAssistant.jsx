const HA_URL = window.HA_URL
const HA_TOKEN = window.HA_TOKEN
const HA_LIGHTS = window.HA_LIGHTS
const HA_SWITCHES = window.HA_SWITCHES
const HEADERS = {
    "Authorization": `Bearer ${HA_TOKEN}`,
    "Content-Type": "application/json"
}

// Common function
async function getAllStates() {
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

// Get wanted lights
export async function getLights() {
    const data = await getAllStates();
    return data
        .filter(e => HA_LIGHTS.includes(e.entity_id))
        .map(mapEntity)
}

// Get wanted switches
export async function getSwitches() {
    const data = await getAllStates();
    return data
        .filter(e => HA_SWITCHES.includes(e.entity_id))
        .map(mapEntity)
}

// Toggle light on & off
export async function toggleLight(entityId, isActive) {
    const service = isActive ? "turn_off" : "turn_on"
    await fetch(`${HA_URL}/api/services/light/${service}`, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify({entity_id: entityId}),
    })
}

// Toggle switch on & off
export async function toggleSwitch(entityId, isActive) {
    const service = isActive ? "turn_off" : "turn_on"
    await fetch(`${HA_URL}/api/services/switch/${service}`, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify({entity_id: entityId}),
    })
}