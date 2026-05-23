// SVG-Diagramme für die Wissensseite. Schlicht, beschriftet, dunkles Theme.

export function AtpCycleSVG() {
  return (
    <svg viewBox="0 0 360 220" xmlns="http://www.w3.org/2000/svg" aria-label="ATP-Zyklus">
      <defs>
        <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" fill="#ff5a4e"/>
        </marker>
      </defs>
      <circle cx="80" cy="110" r="50" fill="#1c2230" stroke="#4ade80" strokeWidth="2"/>
      <text x="80" y="100" textAnchor="middle" fill="#e6e9ee" fontSize="18" fontWeight="700">ATP</text>
      <text x="80" y="120" textAnchor="middle" fill="#98a1b3" fontSize="11">Energie geladen</text>

      <circle cx="280" cy="110" r="50" fill="#1c2230" stroke="#ffb84c" strokeWidth="2"/>
      <text x="280" y="100" textAnchor="middle" fill="#e6e9ee" fontSize="18" fontWeight="700">ADP + P</text>
      <text x="280" y="120" textAnchor="middle" fill="#98a1b3" fontSize="11">Energie verbraucht</text>

      <path d="M130 90 Q 180 30, 230 90" fill="none" stroke="#ff5a4e" strokeWidth="2" markerEnd="url(#arr)"/>
      <text x="180" y="40" textAnchor="middle" fill="#ff5a4e" fontSize="12">Muskelarbeit (-30,5 kJ/mol)</text>

      <path d="M230 130 Q 180 190, 130 130" fill="none" stroke="#4ade80" strokeWidth="2" markerEnd="url(#arr)"/>
      <text x="180" y="200" textAnchor="middle" fill="#4ade80" fontSize="12">Wiederaufbau (KP, Glukose, Fett)</text>
    </svg>
  );
}

export function EnergySystemsSVG() {
  // Anteilskurve der drei Systeme über Belastungsdauer (log-Achse symbolisch)
  return (
    <svg viewBox="0 0 360 220" xmlns="http://www.w3.org/2000/svg" aria-label="Energiesysteme über Zeit">
      <line x1="40" y1="190" x2="340" y2="190" stroke="#98a1b3"/>
      <line x1="40" y1="190" x2="40" y2="20" stroke="#98a1b3"/>
      <text x="190" y="210" textAnchor="middle" fill="#98a1b3" fontSize="11">Zeit (1s → 60min, log)</text>
      <text x="20" y="105" textAnchor="middle" fill="#98a1b3" fontSize="11" transform="rotate(-90 20,105)">Anteil</text>

      {/* Phosphagen */}
      <path d="M40 30 Q 100 30, 130 170 L 130 190 L 40 190 Z" fill="#ff5a4e" opacity="0.7"/>
      <text x="80" y="60" fill="#fff" fontSize="11">Phosphagen</text>

      {/* Anaerobe Glykolyse */}
      <path d="M70 190 L 90 80 L 200 100 L 220 190 Z" fill="#ffb84c" opacity="0.6"/>
      <text x="150" y="90" fill="#fff" fontSize="11">anaerobe Glykolyse</text>

      {/* Aerob */}
      <path d="M150 190 Q 200 110, 340 35 L 340 190 Z" fill="#4ade80" opacity="0.55"/>
      <text x="270" y="80" fill="#fff" fontSize="11">aerobe Oxidation</text>

      {/* X-Achsen Marker */}
      <text x="60"  y="205" fill="#98a1b3" fontSize="10">0–10s</text>
      <text x="150" y="205" fill="#98a1b3" fontSize="10">~1min</text>
      <text x="250" y="205" fill="#98a1b3" fontSize="10">5–10min</text>
      <text x="320" y="205" fill="#98a1b3" fontSize="10">&gt;30min</text>
    </svg>
  );
}

export function AeroAnaeroSVG() {
  // Laktatschwelle-Kurve: Laktat vs. Intensität
  return (
    <svg viewBox="0 0 360 220" xmlns="http://www.w3.org/2000/svg" aria-label="Laktatschwelle">
      <line x1="40" y1="190" x2="340" y2="190" stroke="#98a1b3"/>
      <line x1="40" y1="190" x2="40" y2="20" stroke="#98a1b3"/>
      <text x="190" y="210" textAnchor="middle" fill="#98a1b3" fontSize="11">Intensität (% HFmax)</text>
      <text x="20" y="105" textAnchor="middle" fill="#98a1b3" fontSize="11" transform="rotate(-90 20,105)">Laktat [mmol/L]</text>

      <path d="M40 175 Q 150 170, 220 140 Q 280 80, 340 30" fill="none" stroke="#ff5a4e" strokeWidth="2.5"/>

      <line x1="220" y1="20" x2="220" y2="190" stroke="#ffb84c" strokeDasharray="4,4"/>
      <text x="225" y="35" fill="#ffb84c" fontSize="11">anaerobe Schwelle</text>
      <text x="225" y="50" fill="#ffb84c" fontSize="10">~4 mmol/L</text>

      <rect x="40" y="180" width="180" height="10" fill="#4ade80" opacity="0.4"/>
      <text x="130" y="175" textAnchor="middle" fill="#4ade80" fontSize="11">aerob</text>

      <rect x="220" y="180" width="120" height="10" fill="#ef4444" opacity="0.4"/>
      <text x="280" y="175" textAnchor="middle" fill="#ef4444" fontSize="11">anaerob</text>
    </svg>
  );
}

export function EpocSVG() {
  return (
    <svg viewBox="0 0 360 220" xmlns="http://www.w3.org/2000/svg" aria-label="EPOC – Nachbrenneffekt">
      <line x1="40" y1="170" x2="340" y2="170" stroke="#98a1b3"/>
      <line x1="40" y1="170" x2="40" y2="20" stroke="#98a1b3"/>
      <text x="190" y="195" textAnchor="middle" fill="#98a1b3" fontSize="11">Zeit</text>
      <text x="20" y="95" textAnchor="middle" fill="#98a1b3" fontSize="11" transform="rotate(-90 20,95)">O₂-Verbrauch</text>

      <rect x="40" y="130" width="80" height="40" fill="#98a1b3" opacity="0.3"/>
      <text x="80" y="150" textAnchor="middle" fill="#98a1b3" fontSize="10">Ruhe</text>

      <rect x="120" y="40" width="60" height="130" fill="#ff5a4e" opacity="0.7"/>
      <text x="150" y="60" textAnchor="middle" fill="#fff" fontSize="11">Training</text>

      <path d="M180 50 Q 240 80, 340 130 L 340 170 L 180 170 Z" fill="#ffb84c" opacity="0.5"/>
      <text x="260" y="115" textAnchor="middle" fill="#ffb84c" fontSize="11">EPOC (bis 24h)</text>

      <line x1="40" y1="130" x2="340" y2="130" stroke="#4ade80" strokeDasharray="3,3"/>
      <text x="345" y="133" fill="#4ade80" fontSize="10">Ruheniveau</text>
    </svg>
  );
}

export function RecoveryCurveSVG() {
  return (
    <svg viewBox="0 0 360 220" xmlns="http://www.w3.org/2000/svg" aria-label="Regenerationskurve">
      <line x1="40" y1="190" x2="340" y2="190" stroke="#98a1b3"/>
      <line x1="40" y1="190" x2="40" y2="20" stroke="#98a1b3"/>
      <text x="190" y="210" textAnchor="middle" fill="#98a1b3" fontSize="11">Stunden nach Training</text>
      <text x="20" y="105" textAnchor="middle" fill="#98a1b3" fontSize="11" transform="rotate(-90 20,105)">Belastung</text>

      <path d="M40 30 Q 100 60, 160 120 Q 220 160, 340 185" fill="none" stroke="#ff5a4e" strokeWidth="2.5"/>
      <line x1="40" y1="110" x2="340" y2="110" stroke="#ffb84c" strokeDasharray="4,4"/>
      <text x="60" y="105" fill="#ffb84c" fontSize="10">50% – Halbwertszeit</text>

      <text x="80"  y="50"  fill="#98a1b3" fontSize="10">100%</text>
      <text x="150" y="135" fill="#98a1b3" fontSize="10">~48h</text>
      <text x="280" y="195" fill="#98a1b3" fontSize="10">~72h</text>

      <text x="100" y="200" fill="#98a1b3" fontSize="10">0h</text>
      <text x="180" y="200" fill="#98a1b3" fontSize="10">24h</text>
      <text x="240" y="200" fill="#98a1b3" fontSize="10">48h</text>
      <text x="310" y="200" fill="#98a1b3" fontSize="10">72h</text>
    </svg>
  );
}

export function VolumeIntensitySVG() {
  return (
    <svg viewBox="0 0 360 220" xmlns="http://www.w3.org/2000/svg" aria-label="Volumen vs. Intensität">
      <line x1="40" y1="190" x2="340" y2="190" stroke="#98a1b3"/>
      <line x1="40" y1="190" x2="40" y2="20" stroke="#98a1b3"/>
      <text x="190" y="210" textAnchor="middle" fill="#98a1b3" fontSize="11">Intensität (% 1RM)</text>
      <text x="20" y="105" textAnchor="middle" fill="#98a1b3" fontSize="11" transform="rotate(-90 20,105)">Wiederholungen</text>

      <path d="M60 30 Q 140 60, 200 120 Q 260 170, 320 185" fill="none" stroke="#ff5a4e" strokeWidth="2.5"/>

      <text x="80" y="50" fill="#ffb84c" fontSize="11">Kraftausdauer</text>
      <text x="80" y="62" fill="#98a1b3" fontSize="10">15–30 WH · 50–65%</text>

      <text x="170" y="130" fill="#4ade80" fontSize="11">Hypertrophie</text>
      <text x="170" y="142" fill="#98a1b3" fontSize="10">6–15 WH · 65–85%</text>

      <text x="250" y="180" fill="#ef4444" fontSize="11">Maximalkraft</text>
      <text x="250" y="192" fill="#98a1b3" fontSize="10">1–5 WH · 85–100%</text>
    </svg>
  );
}

export const SVG_MAP = {
  atp_cycle:        AtpCycleSVG,
  energy_systems:   EnergySystemsSVG,
  aero_anaero:      AeroAnaeroSVG,
  epoc:             EpocSVG,
  recovery_curve:   RecoveryCurveSVG,
  volume_intensity: VolumeIntensitySVG,
};
