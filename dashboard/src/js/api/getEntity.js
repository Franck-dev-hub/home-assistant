import {fetchStateIndex, mapEntity} from "./HomeAssistant.js";

function tilesOfType(type) {
    return window.ROOMS.flatMap(room => room.tiles.filter(t => t.type === type));
}

function printerEntity(byId) {
    const powerSwitch = window.PRINTER?.powerSwitch;
    return (powerSwitch && byId.get(powerSwitch)) || null;
}

export async function getLights() {
    const byId = await fetchStateIndex();
    const lights = tilesOfType("light")
        .map(t => byId.get(t.id))
        .filter(Boolean)
        .map(mapEntity);

    if (window.PRINTER?.category === "light") {
        const printerPower = printerEntity(byId);
        if (printerPower && !lights.some(l => l.id === printerPower.entity_id)) {
            lights.push(mapEntity(printerPower));
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

    if (window.PRINTER?.category === "switch") {
        const printerPower = printerEntity(byId);
        if (printerPower && !switches.some(s => s.id === printerPower.entity_id)) {
            switches.push(mapEntity(printerPower));
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
                return {type: tile.type, ...mapEntity(entity)};
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
