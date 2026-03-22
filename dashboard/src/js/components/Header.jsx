import {
    CloudSun,
    Cloud,
    CloudFog,
    CloudDrizzle,
    CloudRain,
    CloudSnow,
    CloudLightning,
    CloudHail,
    Snowflake,
    Sun
} from "lucide-react";
import "../../css/header.css";

export const weatherConfig = {
    0: {label: "Ciel dégagé", icon: Sun, color: "#ffb703"},
    1: {label: "Principalement dégagé", icon: CloudSun, color: "#ffb703"},
    2: {label: "Partiellement nuageux", icon: CloudSun, color: "#94a3b8"},
    3: {label: "Couvert", icon: Cloud, color: "#64748b"},
    45: {label: "Brouillard", icon: CloudFog, color: "#94a3b8"},
    48: {label: "Brouillard givrant", icon: CloudFog, color: "#cbd5e1"},
    51: {label: "Bruine légère", icon: CloudDrizzle, color: "#38bdf8"},
    53: {label: "Bruine modérée", icon: CloudDrizzle, color: "#38bdf8"},
    55: {label: "Bruine dense", icon: CloudDrizzle, color: "#0ea5e9"},
    61: {label: "Pluie légère", icon: CloudRain, color: "#38bdf8"},
    63: {label: "Pluie modérée", icon: CloudRain, color: "#0ea5e9"},
    65: {label: "Pluie forte", icon: CloudRain, color: "#0284c7"},
    80: {label: "Averses légères", icon: CloudRain, color: "#38bdf8"},
    81: {label: "Averses modérées", icon: CloudRain, color: "#0ea5e9"},
    82: {label: "Averses violentes", icon: CloudRain, color: "#0284c7"},
    71: {label: "Neige légère", icon: Snowflake, color: "#f8fafc"},
    73: {label: "Neige modérée", icon: Snowflake, color: "#f1f5f9"},
    75: {label: "Neige forte", icon: Snowflake, color: "#e2e8f0"},
    77: {label: "Grains de neige", icon: Snowflake, color: "#e2e8f0"},
    85: {label: "Averses de neige", icon: CloudSnow, color: "#f1f5f9"},
    86: {label: "Fortes averses de neige", icon: CloudSnow, color: "#e2e8f0"},
    95: {label: "Orage", icon: CloudLightning, color: "#fbbf24"},
    96: {label: "Orage et grêle", icon: CloudHail, color: "#fbbf24"},
    99: {label: "Orage et forte grêle", icon: CloudHail, color: "#f59e0b"},
};

export default function Header({weather}) {
    if (!weather) return <header><h1>Bonjour Franck</h1></header>;
    const config = weatherConfig[weather.code] || {label: "Météo", icon: Sun, color: "#ffb703"};
    const IconComponent = config.icon;

    return (
        <header>
            <h1>Bonjour
                <span className="text-[var(--accent)] font-bold italic"> Franck</span>
            </h1>
            <div className="header-right">
                <div className="weather-main">
                    <IconComponent
                        size={32}
                        color={config.color}
                        strokeWidth={2.5}
                        className="weather-icon-svg"
                    />
                    <span className="weather-icon">{weather.temp}°C</span>
                </div>
                <div className="weather-desc">
                    {config.label} · Calmont
                </div>
            </div>
        </header>
    );
}