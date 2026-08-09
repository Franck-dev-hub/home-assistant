export function getRoomStats(room) {
    const countable = room.tiles.filter(t => t.type === "light" || t.type === "switch");
    return {
        active: countable.filter(t => t.isActive).length,
        total: countable.length,
    };
}
