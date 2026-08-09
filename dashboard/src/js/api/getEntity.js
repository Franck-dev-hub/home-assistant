import {fetchStateIndex, mapEntity} from "./HomeAssistant.js";
import {CUSTOM_CONFIGS} from "../customs/index.js";

function tilesOfType(type) {
    return window.ROOMS.flatMap(room => room.tiles.filter(t => t.type === type));
}

function customEntities(byId, category) {
    return CUSTOM_CONFIGS
        .filter(c => c.category === category && c.powerSwitch)
        .map(c => byId.get(c.powerSwitch))
        .filter(Boolean);
}

export async function getLights() {
    const byId = await fetchStateIndex();
    const lights = tilesOfType("light")
        .map(t => byId.get(t.id))
        .filter(Boolean)
        .map(mapEntity);

    for (const entity of customEntities(byId, "light")) {
        if (!lights.some(l => l.id === entity.entity_id)) {
            lights.push(mapEntity(entity));
        }
    }

    return lights;
}

export async function getSwitches() {
    const byId = await fetchStateIndex();
    const switches = tilesOfType("switch")
        .map(t => byId.get(t.id))
        .filter(Boolean)
        .map(mapEntity);

    for (const entity of customEntities(byId, "switch")) {
        if (!switches.some(s => s.id === entity.entity_id)) {
            switches.push(mapEntity(entity));
        }
    }

    return switches;
}

export async function getRooms() {
    const byId = await fetchStateIndex();

    return window.ROOMS.map(room => {
        const tiles = room.tiles
            .map(tile => {
                if (tile.type === "custom") {
                    return tile;
                }
                const entity = byId.get(tile.id);
                if (!entity) {
                    return null;
                }
                return {type: tile.type, icon: tile.icon, ...mapEntity(entity)};
            })
            .filter(Boolean);

        return {
            id: room.id,
            name: room.name,
            icon: room.icon,
            tiles,
        };
    });
}
