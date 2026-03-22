// Toggle light on & off
export async function toggleLight(entityId, isActive) {
    const service = isActive ? "turn_off" : "turn_on"
    await fetch(`${window.HA_URL}/api/services/light/${service}`, {
        method: "POST",
        headers: window.HEADERS,
        body: JSON.stringify({entity_id: entityId}),
    })
}

// Toggle switch on & off
export async function toggleSwitch(entityId, isActive) {
    const service = isActive ? "turn_off" : "turn_on"
    await fetch(`${window.HA_URL}/api/services/switch/${service}`, {
        method: "POST",
        headers: window.HEADERS,
        body: JSON.stringify({entity_id: entityId}),
    })
}