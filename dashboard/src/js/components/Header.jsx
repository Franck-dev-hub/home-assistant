import "../../css/header.css";

export default function Header() {
    return (
        <header>
            <h1>Bonjour
                <span className="text-[var(--accent)] font-bold italic"> Franck</span>
            </h1>
            <div className="header-right">
                <div className="weather-main">20°</div>
                <div className="weather-desc">☁️ Partiellement nuageux · Calmont</div>
            </div>
        </header>
    );
}