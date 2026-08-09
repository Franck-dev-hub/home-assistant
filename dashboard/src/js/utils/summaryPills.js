import {IconBulb, IconPlug} from "@tabler/icons-vue";

export function buildSummaryPills(lights, switches) {
    return [
        {
            icon: IconBulb,
            value: `${lights.filter(l => l.isActive).length}/${lights.length}`,
        },
        {
            icon: IconPlug,
            value: `${switches.filter(s => s.isActive).length}/${switches.length}`,
        },
    ];
}
