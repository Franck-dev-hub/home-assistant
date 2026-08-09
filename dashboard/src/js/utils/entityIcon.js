import * as icons from "@tabler/icons-vue";

import {ENTITY_ICONS} from "../constants/entityIcons.js";

export function resolveEntityIcon(tile, active) {
    if (tile.icon) {
        const [onName, offName] = Array.isArray(tile.icon) ? tile.icon : [tile.icon, tile.icon];
        const onIcon = icons[`Icon${onName}`];
        if (onIcon) {
            return active ? onIcon : (icons[`Icon${offName}`] ?? onIcon);
        }
    }
    return ENTITY_ICONS[tile.type][active ? "on" : "off"];
}
