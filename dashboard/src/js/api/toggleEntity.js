export async function toggleEntity(entityId, isActive) {
    const domain = entityId.split(".")[0];
    const service = isActive ? "turn_off" : "turn_on";
    await fetch(`/api/ha/services/${domain}/${service}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({entity_id: entityId}),
    });
}

export async function toggleLight(entityId, isActive) {
    return toggleEntity(entityId, isActive);
}

export async function toggleSwitch(entityId, isActive) {
    return toggleEntity(entityId, isActive);
}

export async function setNumberValue(entityId, value) {
    await fetch("/api/ha/services/number/set_value", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({entity_id: entityId, value}),
    });
}

export async function pressButton(entityId) {
    await fetch("/api/ha/services/button/press", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({entity_id: entityId}),
    });
}
