// Counts active/total entities across a room's lights and switches
export function getRoomStats(room) {
    const all = [...room.lights, ...room.switches];
    return {
        active: all.filter(e => e.isActive).length,
        total: all.length,
    };
}
