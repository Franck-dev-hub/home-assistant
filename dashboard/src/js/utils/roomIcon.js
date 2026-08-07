import * as icons from "@tabler/icons-vue";
import {IconHome} from "@tabler/icons-vue";

// Resolves a room's configured icon name (e.g. "ChefHat") to its Tabler
// component (exported as "IconChefHat").
export function resolveRoomIcon(name) {
    return icons[`Icon${name}`] || IconHome;
}
