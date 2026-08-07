// Toggle light on & off
export async function toggleLight(entityId, isActive) {
    const service = isActive ? "turn_off" : "turn_on";
    await fetch(`/api/ha/services/light/${service}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({entity_id: entityId}),
    });
}

// Toggle switch on & off
export async function toggleSwitch(entityId, isActive) {
    const service = isActive ? "turn_off" : "turn_on";
    await fetch(`/api/ha/services/switch/${service}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({entity_id: entityId}),
    });
}
