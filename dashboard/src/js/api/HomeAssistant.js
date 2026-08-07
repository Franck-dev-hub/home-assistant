// Common function
export async function getAllStates() {
    const response = await fetch("/api/ha/states");
    return await response.json();
}

// Common object creation
export function mapEntity(entity) {
    return {
        id: entity.entity_id,
        name: entity.attributes.friendly_name,
        isActive: entity.state === "on",
    };
}
