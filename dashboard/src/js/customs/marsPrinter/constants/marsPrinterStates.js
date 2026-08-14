export const MARS_PRINTER_STATE_LABELS = {
    idle: "En veille",
    printing: "Impression en cours",
    file_transferring: "Transfert du fichier",
    exposure_testing: "Test d'exposition",
    devices_testing: "Test des périphériques",
    leveling: "Calibrage",
    input_shaping: "Calibrage vibrations",
    stopping: "Arrêt en cours",
    stopped: "Arrêtée",
    homing: "Retour position initiale",
    loading_unloading: "Chargement/déchargement",
    pid_tuning: "Réglage PID",
    recovery: "Récupération",
};

export function marsPrinterStateLabel(state) {
    return MARS_PRINTER_STATE_LABELS[state] ?? "État inconnu";
}

const MARS_PRINTER_STATE_COLORS = {
    idle: {color: "var(--muted)", background: "var(--surface-2)"},
    printing: {color: "var(--accent)", background: "var(--accent-soft)"},
    stopping: {color: "var(--warm)", background: "var(--warm-soft)"},
    stopped: {color: "var(--muted)", background: "var(--surface-2)"},
};

export function marsPrinterStateColor(state) {
    return MARS_PRINTER_STATE_COLORS[state] ?? {color: "var(--accent)", background: "var(--accent-soft)"};
}
