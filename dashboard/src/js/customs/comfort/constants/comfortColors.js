const TEMP_BANDS = [
    {max: 3, color: "mediumblue"},
    {max: 4.9, color: "dodgerblue"},
    {max: 8.9, color: "deepskyblue"},
    {max: 13.9, color: "mediumaquamarine"},
    {max: 18.9, color: "seagreen"},
    {max: 23.9, color: "limegreen"},
    {max: 27.9, color: "gold"},
    {max: 34.9, color: "orange"},
    {max: 39.9, color: "crimson"},
    {max: Infinity, color: "black"},
];

export function temperatureColor(tempC) {
    return TEMP_BANDS.find(band => tempC <= band.max).color;
}

export function temperatureRatio(tempC, min = -10, max = 50) {
    return Math.min(1, Math.max(0, (tempC - min) / (max - min)));
}

function humidex(tempC, humidityPct) {
    const dewpoint = tempC - (100 - humidityPct) / 5;
    const e = 6.11 * Math.exp(5417.7530 * (1 / 273.16 - 1 / (273.15 + dewpoint)));
    return tempC + 0.5555 * (e - 10);
}

const HUMIDEX_BANDS = [
    {max: 29, color: "dodgerblue"},
    {max: 39, color: "limegreen"},
    {max: 45, color: "gold"},
    {max: 54, color: "orange"},
    {max: Infinity, color: "crimson"},
];

export function humidityColor(tempC, humidityPct) {
    const index = humidex(tempC, humidityPct);
    return HUMIDEX_BANDS.find(band => index <= band.max).color;
}

export function humidityRatio(humidityPct) {
    return Math.min(1, Math.max(0, humidityPct / 100));
}

const CO2_BANDS = [
    {max: 800, color: "dodgerblue"},
    {max: 1000, color: "limegreen"},
    {max: 1500, color: "gold"},
    {max: 2000, color: "orange"},
    {max: Infinity, color: "crimson"},
];

export function co2Color(ppm) {
    return CO2_BANDS.find(band => ppm <= band.max).color;
}

export function co2Ratio(ppm, min = 400, max = 2000) {
    return Math.min(1, Math.max(0, (ppm - min) / (max - min)));
}

const VOC_BANDS = [
    {max: 150, color: "dodgerblue"},
    {max: 300, color: "limegreen"},
    {max: 500, color: "gold"},
    {max: 1000, color: "orange"},
    {max: Infinity, color: "crimson"},
];

export function vocColor(index) {
    return VOC_BANDS.find(band => index <= band.max).color;
}

export function vocRatio(index, min = 0, max = 1000) {
    return Math.min(1, Math.max(0, (index - min) / (max - min)));
}

const FORMALDEHYDE_BANDS = [
    {max: 30, color: "dodgerblue"},
    {max: 50, color: "limegreen"},
    {max: 80, color: "gold"},
    {max: 100, color: "orange"},
    {max: Infinity, color: "crimson"},
];

export function formaldehydeColor(microgramsPerM3) {
    return FORMALDEHYDE_BANDS.find(band => microgramsPerM3 <= band.max).color;
}

export function formaldehydeRatio(microgramsPerM3, min = 0, max = 100) {
    return Math.min(1, Math.max(0, (microgramsPerM3 - min) / (max - min)));
}
