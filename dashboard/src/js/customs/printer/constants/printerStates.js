export const PRINTER_STATE_LABELS = {
    standby: "En veille",
    printing: "Impression en cours",
    paused: "En pause",
    complete: "Impression terminée",
    error: "Erreur",
    cancelled: "Annulée",
};

export function printerStateLabel(state) {
    return PRINTER_STATE_LABELS[state] ?? "État inconnu";
}

const PRINTER_STATE_COLORS = {
    standby: {color: "var(--success)", background: "var(--success-soft)"},
    printing: {color: "var(--accent)", background: "var(--accent-soft)"},
    paused: {color: "var(--warm)", background: "var(--warm-soft)"},
    complete: {color: "var(--success)", background: "var(--success-soft)"},
    error: {color: "var(--danger)", background: "var(--danger-soft)"},
    cancelled: {color: "var(--muted)", background: "var(--surface-2)"},
};

const OFF_COLOR = {color: "var(--muted)", background: "var(--surface-2)"};

export function printerStateColor(state, powerActive) {
    if (!powerActive) return OFF_COLOR;
    return PRINTER_STATE_COLORS[state] ?? OFF_COLOR;
}
