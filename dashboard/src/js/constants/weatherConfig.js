import {
    IconSun,
    IconCloud,
    IconCloudFog,
    IconCloudRain,
    IconCloudSnow,
    IconCloudBolt,
    IconCloudStorm,
    IconSnowflake,
} from "@tabler/icons-vue";

// Open-Meteo weather codes -> label/icon/color
// Tabler has no dedicated "partly cloudy"/"drizzle"/"hail" glyphs, so those
// fall back to the closest available icon (sun/cloud, rain, storm).
export const WEATHER_CONFIG = {
    0: {label: "Ciel dégagé", icon: IconSun, color: "#f6b26b"},
    1: {label: "Principalement dégagé", icon: IconSun, color: "#f6b26b"},
    2: {label: "Partiellement nuageux", icon: IconCloud, color: "#8a92ad"},
    3: {label: "Couvert", icon: IconCloud, color: "#767c94"},
    45: {label: "Brouillard", icon: IconCloudFog, color: "#8a92ad"},
    48: {label: "Brouillard givrant", icon: IconCloudFog, color: "#b7bdd4"},
    51: {label: "Bruine légère", icon: IconCloudRain, color: "#667eea"},
    53: {label: "Bruine modérée", icon: IconCloudRain, color: "#667eea"},
    55: {label: "Bruine dense", icon: IconCloudRain, color: "#5468d4"},
    61: {label: "Pluie légère", icon: IconCloudRain, color: "#667eea"},
    63: {label: "Pluie modérée", icon: IconCloudRain, color: "#5468d4"},
    65: {label: "Pluie forte", icon: IconCloudRain, color: "#4757c0"},
    80: {label: "Averses légères", icon: IconCloudRain, color: "#667eea"},
    81: {label: "Averses modérées", icon: IconCloudRain, color: "#5468d4"},
    82: {label: "Averses violentes", icon: IconCloudRain, color: "#4757c0"},
    71: {label: "Neige légère", icon: IconSnowflake, color: "#dfe4f7"},
    73: {label: "Neige modérée", icon: IconSnowflake, color: "#cfd6f2"},
    75: {label: "Neige forte", icon: IconSnowflake, color: "#bcc5ec"},
    77: {label: "Grains de neige", icon: IconSnowflake, color: "#bcc5ec"},
    85: {label: "Averses de neige", icon: IconCloudSnow, color: "#cfd6f2"},
    86: {label: "Fortes averses de neige", icon: IconCloudSnow, color: "#bcc5ec"},
    95: {label: "Orage", icon: IconCloudBolt, color: "#f6b26b"},
    96: {label: "Orage et grêle", icon: IconCloudStorm, color: "#f6b26b"},
    99: {label: "Orage et forte grêle", icon: IconCloudStorm, color: "#f59e0b"},
};

export const DEFAULT_WEATHER = {label: "Météo", icon: IconSun, color: "var(--accent)"};

export function getWeatherDisplay(code) {
    return WEATHER_CONFIG[code] || DEFAULT_WEATHER;
}
