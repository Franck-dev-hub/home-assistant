import * as icons from "@tabler/icons-vue";
import {IconHome} from "@tabler/icons-vue";

export function resolveRoomIcon(name) {
    return icons[`Icon${name}`] || IconHome;
}
