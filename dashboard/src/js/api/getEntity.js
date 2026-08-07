import {getAllStates, mapEntity} from "./HomeAssistant.js";

// Get all lights across every room
export async function getLights() {
    const data = await getAllStates();
    const allLightIds = window.ROOMS.flatMap(room => room.lights);
    return data
        .filter(e => allLightIds.includes(e.entity_id))
        .map(mapEntity);
}

// Get all switches across every room
export async function getSwitches() {
    const data = await getAllStates();
    const allSwitchIds = window.ROOMS.flatMap(room => room.switches);
    return data
        .filter(e => allSwitchIds.includes(e.entity_id))
        .map(mapEntity);
}

// Get rooms hydrated with their lights/switches entity states
export async function getRooms() {
    const data = await getAllStates();
    const byId = new Map(data.map(e => [e.entity_id, e]));

    return window.ROOMS.map(room => {
        const lights = room.lights
            .map(id => byId.get(id))
            .filter(Boolean)
            .map(mapEntity);
        const switches = room.switches
            .map(id => byId.get(id))
            .filter(Boolean)
            .map(mapEntity);

        return {
            id: room.id,
            name: room.name,
            icon: room.icon,
            lights,
            switches,
        };
    });
}
