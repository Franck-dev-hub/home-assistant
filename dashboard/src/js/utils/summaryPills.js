import {IconBulb, IconPlug} from "@tabler/icons-vue";

// Builds the SummaryStrip pills from the raw lights/switches lists
export function buildSummaryPills(lights, switches) {
    return [
        {
            icon: IconBulb,
            value: `${lights.filter(l => l.isActive).length}/${lights.length}`,
            label: "lumières allumées",
        },
        {
            icon: IconPlug,
            value: `${switches.filter(s => s.isActive).length}/${switches.length}`,
            label: "prises actives",
        },
    ];
}
