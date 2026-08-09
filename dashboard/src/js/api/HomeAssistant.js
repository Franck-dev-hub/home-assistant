export async function getAllStates() {
    const response = await fetch("/api/ha/states");
    return await response.json();
}

export async function fetchStateIndex() {
    const data = await getAllStates();
    return new Map(data.map(e => [e.entity_id, e]));
}

export function mapEntity(entity) {
    return {
        id: entity.entity_id,
        name: entity.attributes.friendly_name,
        isActive: entity.state === "on",
    };
}
