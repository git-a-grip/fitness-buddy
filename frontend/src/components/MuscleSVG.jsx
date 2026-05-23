// Anatomische Muskel-SVGs (vorne / hinten).
//
// Aufbau in Layern (untere zuerst, also unten gezeichnet):
//   1. Body Outline (Stroke)
//   2. Skin Background (gefüllter Body) – damit Muskeln auf "Haut" sitzen statt im Schwarz
//   3. Tiefe Muskeln (Rotatoren, Brachialis, Vastus intermedius …) als dezenter Untergrund
//   4. Oberflächen-Muskeln (Pec, Lat, Quads, Glutes …) mit Bézier-Konturen + Faserlinien
//   5. Landmarken (Sternum, Linea alba, Wirbelsäule, Klavikula, Patella) als dunkle Striche
//
// Jeder Muskel ist eine <g data-muscle="slug">-Gruppe, sodass Farbe + Hover gruppiert greifen.

// === Anatomie-Konstanten (Bezugspunkte) ===
const BODY_OUTLINE = `M100 18
  C 88 18, 80 28, 80 42
  C 80 52, 84 60, 90 64
  L 80 80
  L 62 92 L 54 110 L 50 135 L 50 165
  L 55 180 L 60 165 L 62 145
  L 70 145 L 76 175 L 80 220 L 78 270
  L 75 320 L 73 380 L 78 440 L 88 450 L 96 450 L 98 405 L 100 360
  L 102 405 L 104 450 L 112 450 L 122 440 L 127 380 L 125 320
  L 122 270 L 120 220 L 124 175 L 130 145 L 138 145 L 140 165 L 145 180
  L 150 165 L 150 135 L 145 110 L 138 92 L 120 80 L 110 64
  C 116 60, 120 52, 120 42 C 120 28, 112 18, 100 18 Z`;

function BodyOutline()      { return <path className="outline" d={BODY_OUTLINE}/>; }
function SkinBackground()   { return <path className="skin"    d={BODY_OUTLINE}/>; }

// Muskelgruppe
function MG({ slug, children, getFill, getStroke, onMuscleEnter, onMuscleLeave, onMuscleClick }) {
  return (
    <g
      className="muscle"
      data-muscle={slug}
      fill={getFill ? getFill(slug) : undefined}
      stroke={getStroke ? getStroke(slug) : '#1a1f28'}
      strokeWidth={0.5}
      strokeLinejoin="round"
      onMouseEnter={(e) => onMuscleEnter && onMuscleEnter(slug, e)}
      onMouseMove={(e)  => onMuscleEnter && onMuscleEnter(slug, e)}
      onMouseLeave={()  => onMuscleLeave && onMuscleLeave()}
      onClick={()       => onMuscleClick && onMuscleClick(slug)}
    >
      {children}
    </g>
  );
}

// Innenlinie – fill=none, halbtransparent, für Faserrichtung
function F({ d }) {
  return <path d={d} fill="none" strokeWidth={0.45} opacity={0.45} />;
}

// Landmarke – feste dunkle Linie (sitzt über Muskeln)
function L({ d }) { return <path className="landmark" d={d}/>; }

// ===========================================================================
// FRONT
// ===========================================================================
export function FrontBodySVG({ onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke }) {
  const evt = { onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke };

  return (
    <svg className="body-svg" viewBox="0 0 200 460" xmlns="http://www.w3.org/2000/svg">
      <BodyOutline />
      <SkinBackground />

      {/* ---- DEEP LAYER: Brachialis, vastus intermedius, pec minor ---- */}
      <MG slug="pectoralis_minor" {...evt}>
        <path d="M86 116 Q 90 122, 96 124 L 96 128 Q 90 126, 86 122 Z"/>
      </MG>
      <MG slug="pectoralis_minor" {...evt}>
        <path d="M114 116 Q 110 122, 104 124 L 104 128 Q 110 126, 114 122 Z"/>
      </MG>

      <MG slug="vastus_intermedius" {...evt}>
        <path d="M93 238 Q 92 260, 95 285 L 96 285 Q 94 260, 95 238 Z"/>
      </MG>
      <MG slug="vastus_intermedius" {...evt}>
        <path d="M107 238 Q 108 260, 105 285 L 104 285 Q 106 260, 105 238 Z"/>
      </MG>

      <MG slug="brachialis" {...evt}>
        <path d="M57 150 Q 54 160, 56 170 Q 62 172, 67 170 Q 67 160, 66 150 Q 62 148, 57 150 Z"/>
      </MG>
      <MG slug="brachialis" {...evt}>
        <path d="M143 150 Q 146 160, 144 170 Q 138 172, 133 170 Q 133 160, 134 150 Q 138 148, 143 150 Z"/>
      </MG>

      {/* ---- SURFACE LAYER ---- */}

      {/* === Pectoralis major: 2 Köpfe (clavicular + sternal) klar erkennbar === */}
      <MG slug="pectoralis_major" {...evt}>
        {/* clavicular head – obere Hälfte */}
        <path d="M99 84
                 Q 92 84, 84 86
                 Q 75 92, 71 102
                 Q 70 110, 74 114
                 L 99 110 Z"/>
        {/* sternal head – untere Hälfte */}
        <path d="M99 110
                 L 74 114
                 Q 73 122, 78 126
                 Q 88 130, 99 128 Z"/>
        <F d="M99 88 Q 90 92, 76 98"/>
        <F d="M99 96 Q 88 102, 72 106"/>
        <F d="M99 104 Q 88 110, 74 113"/>
        <F d="M99 116 Q 90 121, 80 125"/>
        <F d="M99 124 Q 92 128, 85 128"/>
      </MG>
      <MG slug="pectoralis_major" {...evt}>
        <path d="M101 84
                 Q 108 84, 116 86
                 Q 125 92, 129 102
                 Q 130 110, 126 114
                 L 101 110 Z"/>
        <path d="M101 110
                 L 126 114
                 Q 127 122, 122 126
                 Q 112 130, 101 128 Z"/>
        <F d="M101 88 Q 110 92, 124 98"/>
        <F d="M101 96 Q 112 102, 128 106"/>
        <F d="M101 104 Q 112 110, 126 113"/>
        <F d="M101 116 Q 110 121, 120 125"/>
        <F d="M101 124 Q 108 128, 115 128"/>
      </MG>

      {/* === Serratus anterior (3 Zacken seitlich unter Pec) === */}
      <MG slug="serratus_anterior" {...evt}>
        <path d="M71 130 Q 76 132, 80 138 L 79 144 Q 74 144, 71 142 Z"/>
        <path d="M71 146 Q 75 148, 79 152 L 78 158 Q 73 158, 71 156 Z"/>
        <path d="M72 160 Q 75 161, 77 164 L 76 168 Q 73 167, 72 166 Z"/>
        <F d="M72 138 L 78 140"/>
        <F d="M72 152 L 77 154"/>
      </MG>
      <MG slug="serratus_anterior" {...evt}>
        <path d="M129 130 Q 124 132, 120 138 L 121 144 Q 126 144, 129 142 Z"/>
        <path d="M129 146 Q 125 148, 121 152 L 122 158 Q 127 158, 129 156 Z"/>
        <path d="M128 160 Q 125 161, 123 164 L 124 168 Q 127 167, 128 166 Z"/>
        <F d="M128 138 L 122 140"/>
        <F d="M128 152 L 123 154"/>
      </MG>

      {/* === Deltoideus anterior + lateralis (sitzt auf der Schulter) === */}
      <MG slug="deltoideus_anterior" {...evt}>
        <path d="M80 80
                 Q 70 82, 65 92
                 Q 62 102, 66 112
                 Q 72 114, 78 110
                 Q 82 100, 82 88 Z"/>
        <F d="M76 84 Q 70 96, 70 110"/>
        <F d="M80 90 Q 74 100, 74 110"/>
      </MG>
      <MG slug="deltoideus_anterior" {...evt}>
        <path d="M120 80
                 Q 130 82, 135 92
                 Q 138 102, 134 112
                 Q 128 114, 122 110
                 Q 118 100, 118 88 Z"/>
        <F d="M124 84 Q 130 96, 130 110"/>
        <F d="M120 90 Q 126 100, 126 110"/>
      </MG>
      <MG slug="deltoideus_lateralis" {...evt}>
        <path d="M62 102 Q 58 114, 62 124 Q 68 126, 72 122 Q 72 112, 70 102 Z"/>
        <F d="M63 110 L 67 122"/>
        <F d="M66 108 L 69 122"/>
      </MG>
      <MG slug="deltoideus_lateralis" {...evt}>
        <path d="M138 102 Q 142 114, 138 124 Q 132 126, 128 122 Q 128 112, 130 102 Z"/>
        <F d="M137 110 L 133 122"/>
        <F d="M134 108 L 131 122"/>
      </MG>

      {/* === Biceps brachii (Peak) === */}
      <MG slug="biceps_brachii" {...evt}>
        <path d="M59 126 Q 55 134, 56 144 Q 58 152, 62 152 Q 67 152, 68 144 Q 70 132, 66 126 Q 62 124, 59 126 Z"/>
        <F d="M61 130 Q 60 140, 61 150"/>
        <F d="M65 130 Q 66 140, 65 150"/>
      </MG>
      <MG slug="biceps_brachii" {...evt}>
        <path d="M141 126 Q 145 134, 144 144 Q 142 152, 138 152 Q 133 152, 132 144 Q 130 132, 134 126 Q 138 124, 141 126 Z"/>
        <F d="M139 130 Q 140 140, 139 150"/>
        <F d="M135 130 Q 134 140, 135 150"/>
      </MG>

      {/* === Brachioradialis === */}
      <MG slug="brachioradialis" {...evt}>
        <path d="M54 170 Q 50 182, 52 196 Q 56 198, 60 196 Q 63 184, 62 170 Q 58 168, 54 170 Z"/>
        <F d="M56 174 Q 56 186, 57 194"/>
        <F d="M59 174 Q 60 186, 59 194"/>
      </MG>
      <MG slug="brachioradialis" {...evt}>
        <path d="M146 170 Q 150 182, 148 196 Q 144 198, 140 196 Q 137 184, 138 170 Q 142 168, 146 170 Z"/>
        <F d="M144 174 Q 144 186, 143 194"/>
        <F d="M141 174 Q 140 186, 141 194"/>
      </MG>

      {/* === Flexor carpi === */}
      <MG slug="flexor_carpi" {...evt}>
        <path d="M58 196 Q 55 210, 58 222 Q 63 224, 67 222 Q 67 210, 65 196 Z"/>
        <F d="M60 202 L 60 220"/>
        <F d="M64 202 L 64 220"/>
      </MG>
      <MG slug="flexor_carpi" {...evt}>
        <path d="M142 196 Q 145 210, 142 222 Q 137 224, 133 222 Q 133 210, 135 196 Z"/>
        <F d="M140 202 L 140 220"/>
        <F d="M136 202 L 136 220"/>
      </MG>

      {/* === Rectus abdominis: 6-Pack mit klaren Sehnenlinien === */}
      <MG slug="rectus_abdominis" {...evt}>
        <path d="M90 132
                 Q 88 162, 92 196
                 L 99 196
                 L 99 132 Z"/>
        {/* 3 horizontale Sehnenstreifen + Linea alba angedeutet durch Innenkurve */}
        <F d="M90 148 Q 94 149, 99 148"/>
        <F d="M89 164 Q 94 165, 99 164"/>
        <F d="M89 180 Q 94 181, 99 180"/>
      </MG>
      <MG slug="rectus_abdominis" {...evt}>
        <path d="M110 132
                 Q 112 162, 108 196
                 L 101 196
                 L 101 132 Z"/>
        <F d="M110 148 Q 106 149, 101 148"/>
        <F d="M111 164 Q 106 165, 101 164"/>
        <F d="M111 180 Q 106 181, 101 180"/>
      </MG>

      {/* === Obliquus externus === */}
      <MG slug="obliquus_externus" {...evt}>
        <path d="M80 144
                 Q 76 168, 79 196
                 L 90 196
                 Q 89 168, 90 144
                 Q 85 143, 80 144 Z"/>
        <F d="M80 152 Q 82 172, 82 194"/>
        <F d="M84 148 Q 86 172, 86 194"/>
      </MG>
      <MG slug="obliquus_externus" {...evt}>
        <path d="M120 144
                 Q 124 168, 121 196
                 L 110 196
                 Q 111 168, 110 144
                 Q 115 143, 120 144 Z"/>
        <F d="M120 152 Q 118 172, 118 194"/>
        <F d="M116 148 Q 114 172, 114 194"/>
      </MG>

      {/* === Obliquus internus (kleiner, dezenter) === */}
      <MG slug="obliquus_internus" {...evt}>
        <path d="M84 168 Q 84 184, 86 196 L 91 196 Q 90 184, 90 168 Z"/>
      </MG>
      <MG slug="obliquus_internus" {...evt}>
        <path d="M116 168 Q 116 184, 114 196 L 109 196 Q 110 184, 110 168 Z"/>
      </MG>

      {/* === Transversus abdominis (Querfasern) === */}
      <MG slug="transversus_abdominis" {...evt}>
        <path d="M91 188 Q 100 186, 109 188 L 109 191 Q 100 189, 91 191 Z"/>
        <path d="M91 193 Q 100 191, 109 193 L 109 196 Q 100 194, 91 196 Z"/>
      </MG>

      {/* === Iliopsoas (dreieckig zur Hüfte) === */}
      <MG slug="iliopsoas" {...evt}>
        <path d="M86 198 Q 84 210, 88 220 Q 94 222, 96 220 Q 95 210, 95 198 Z"/>
        <F d="M88 204 L 92 220"/>
      </MG>
      <MG slug="iliopsoas" {...evt}>
        <path d="M114 198 Q 116 210, 112 220 Q 106 222, 104 220 Q 105 210, 105 198 Z"/>
        <F d="M112 204 L 108 220"/>
      </MG>

      {/* === Quadrizeps: 4 deutlich getrennte Wölbungen === */}
      {/* Rectus femoris – Tropfen mittig */}
      <MG slug="rectus_femoris" {...evt}>
        <path d="M97 222 Q 92 240, 94 270 Q 95 286, 97 294 Q 100 296, 99 290 L 99 222 Z"/>
        <F d="M96 230 Q 95 260, 97 290"/>
        <F d="M98 228 Q 97 260, 98 290"/>
      </MG>
      <MG slug="rectus_femoris" {...evt}>
        <path d="M103 222 Q 108 240, 106 270 Q 105 286, 103 294 Q 100 296, 101 290 L 101 222 Z"/>
        <F d="M104 230 Q 105 260, 103 290"/>
        <F d="M102 228 Q 103 260, 102 290"/>
      </MG>

      {/* Vastus lateralis – breite Wölbung außen */}
      <MG slug="vastus_lateralis" {...evt}>
        <path d="M78 226
                 Q 73 252, 78 290
                 L 91 290
                 Q 91 260, 91 226
                 Q 84 222, 78 226 Z"/>
        <F d="M82 234 Q 80 262, 84 286"/>
        <F d="M86 234 Q 85 262, 87 286"/>
        <F d="M89 234 Q 89 262, 90 286"/>
      </MG>
      <MG slug="vastus_lateralis" {...evt}>
        <path d="M122 226
                 Q 127 252, 122 290
                 L 109 290
                 Q 109 260, 109 226
                 Q 116 222, 122 226 Z"/>
        <F d="M118 234 Q 120 262, 116 286"/>
        <F d="M114 234 Q 115 262, 113 286"/>
        <F d="M111 234 Q 111 262, 110 286"/>
      </MG>

      {/* Vastus medialis – Knie-Tropfen innen */}
      <MG slug="vastus_medialis" {...evt}>
        <path d="M93 268 Q 91 282, 94 294 L 99 294 L 99 268 Q 96 266, 93 268 Z"/>
        <F d="M95 274 L 96 292"/>
        <F d="M97 274 L 98 292"/>
      </MG>
      <MG slug="vastus_medialis" {...evt}>
        <path d="M107 268 Q 109 282, 106 294 L 101 294 L 101 268 Q 104 266, 107 268 Z"/>
        <F d="M105 274 L 104 292"/>
        <F d="M103 274 L 102 292"/>
      </MG>

      {/* === Sartorius – schräger Streifen über die ganze Länge === */}
      <MG slug="sartorius" {...evt}>
        <path d="M91 222 Q 94 250, 96 285 L 99 285 Q 95 250, 92 222 Z"/>
        <F d="M93 230 L 97 282"/>
      </MG>
      <MG slug="sartorius" {...evt}>
        <path d="M109 222 Q 106 250, 104 285 L 101 285 Q 105 250, 108 222 Z"/>
        <F d="M107 230 L 103 282"/>
      </MG>

      {/* === Adduktoren (innen) === */}
      <MG slug="adductor_longus" {...evt}>
        <path d="M96 222 Q 93 240, 95 264 L 99 264 L 99 222 Z"/>
        <F d="M97 226 L 98 262"/>
      </MG>
      <MG slug="adductor_longus" {...evt}>
        <path d="M104 222 Q 107 240, 105 264 L 101 264 L 101 222 Z"/>
        <F d="M103 226 L 102 262"/>
      </MG>

      {/* === Tibialis anterior === */}
      <MG slug="tibialis_anterior" {...evt}>
        <path d="M87 320 Q 84 342, 88 368 L 96 368 Q 95 342, 96 320 Z"/>
        <F d="M89 326 L 90 365"/>
        <F d="M92 326 L 93 365"/>
      </MG>
      <MG slug="tibialis_anterior" {...evt}>
        <path d="M113 320 Q 116 342, 112 368 L 104 368 Q 105 342, 104 320 Z"/>
        <F d="M111 326 L 110 365"/>
        <F d="M108 326 L 107 365"/>
      </MG>

      {/* === LANDMARKS (über allem) === */}
      {/* Klavikulae */}
      <L d="M82 84 Q 90 80, 99 84"/>
      <L d="M118 84 Q 110 80, 101 84"/>
      {/* Sternum + Linea alba */}
      <L d="M100 86 L 100 128"/>
      <L d="M100 132 L 100 196"/>
      {/* Bauchnabel */}
      <L d="M99 176 Q 100 178, 101 176 Q 100 174, 99 176 Z"/>
      {/* Iliac crest */}
      <L d="M88 218 Q 92 215, 99 216"/>
      <L d="M112 218 Q 108 215, 101 216"/>
      {/* Inguinal ligament */}
      <L d="M93 218 Q 96 222, 100 222"/>
      <L d="M107 218 Q 104 222, 100 222"/>
      {/* Patella */}
      <L d="M93 296 Q 96 300, 99 296"/>
      <L d="M107 296 Q 104 300, 101 296"/>
      {/* Knöchel */}
      <L d="M88 395 Q 92 393, 96 395"/>
      <L d="M112 395 Q 108 393, 104 395"/>
    </svg>
  );
}

// ===========================================================================
// BACK
// ===========================================================================
export function BackBodySVG({ onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke }) {
  const evt = { onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke };

  return (
    <svg className="body-svg" viewBox="0 0 200 460" xmlns="http://www.w3.org/2000/svg">
      <BodyOutline />
      <SkinBackground />

      {/* ---- DEEP LAYER: Rotatoren + Semimembranosus ---- */}
      <MG slug="supraspinatus" {...evt}>
        <path d="M82 84 Q 86 86, 90 86 L 90 92 Q 86 93, 82 92 Z"/>
      </MG>
      <MG slug="supraspinatus" {...evt}>
        <path d="M118 84 Q 114 86, 110 86 L 110 92 Q 114 93, 118 92 Z"/>
      </MG>
      <MG slug="infraspinatus" {...evt}>
        <path d="M71 96 Q 78 100, 88 100 Q 90 108, 86 112 Q 78 112, 71 110 Z"/>
        <F d="M74 102 L 86 106"/>
        <F d="M74 108 L 86 110"/>
      </MG>
      <MG slug="infraspinatus" {...evt}>
        <path d="M129 96 Q 122 100, 112 100 Q 110 108, 114 112 Q 122 112, 129 110 Z"/>
        <F d="M126 102 L 114 106"/>
        <F d="M126 108 L 114 110"/>
      </MG>
      <MG slug="teres_minor" {...evt}>
        <path d="M71 113 Q 78 115, 84 115 L 84 120 Q 78 121, 71 119 Z"/>
      </MG>
      <MG slug="teres_minor" {...evt}>
        <path d="M129 113 Q 122 115, 116 115 L 116 120 Q 122 121, 129 119 Z"/>
      </MG>
      <MG slug="teres_major" {...evt}>
        <path d="M71 121 Q 78 124, 86 124 L 86 132 Q 78 134, 71 132 Z"/>
      </MG>
      <MG slug="teres_major" {...evt}>
        <path d="M129 121 Q 122 124, 114 124 L 114 132 Q 122 134, 129 132 Z"/>
      </MG>

      <MG slug="semimembranosus" {...evt}>
        <path d="M92 270 Q 90 286, 92 304 L 96 304 Q 96 286, 96 270 Z"/>
      </MG>
      <MG slug="semimembranosus" {...evt}>
        <path d="M108 270 Q 110 286, 108 304 L 104 304 Q 104 286, 104 270 Z"/>
      </MG>

      {/* ---- SURFACE LAYER ---- */}

      {/* === Trapezius (klare Drachenform mit ausgreifenden oberen Spitzen) === */}
      <MG slug="trapezius_upper" {...evt}>
        <path d="M92 64 Q 88 70, 84 80
                 L 80 80
                 L 82 86
                 Q 92 88, 100 86
                 L 100 64 Z"/>
        <F d="M100 68 Q 94 76, 86 84"/>
        <F d="M99 70 Q 94 78, 88 84"/>
      </MG>
      <MG slug="trapezius_upper" {...evt}>
        <path d="M108 64 Q 112 70, 116 80
                 L 120 80
                 L 118 86
                 Q 108 88, 100 86
                 L 100 64 Z"/>
        <F d="M100 68 Q 106 76, 114 84"/>
        <F d="M101 70 Q 106 78, 112 84"/>
      </MG>
      <MG slug="trapezius_middle" {...evt}>
        <path d="M82 88 Q 86 96, 84 110 L 99 112 L 99 88 Z"/>
        <F d="M84 92 L 99 100"/>
        <F d="M84 102 L 99 108"/>
      </MG>
      <MG slug="trapezius_middle" {...evt}>
        <path d="M118 88 Q 114 96, 116 110 L 101 112 L 101 88 Z"/>
        <F d="M116 92 L 101 100"/>
        <F d="M116 102 L 101 108"/>
      </MG>
      <MG slug="trapezius_lower" {...evt}>
        <path d="M86 112 Q 92 124, 96 140 L 99 142 L 99 112 Z"/>
        <F d="M88 118 Q 93 128, 98 140"/>
        <F d="M92 116 Q 95 128, 98 138"/>
      </MG>
      <MG slug="trapezius_lower" {...evt}>
        <path d="M114 112 Q 108 124, 104 140 L 101 142 L 101 112 Z"/>
        <F d="M112 118 Q 107 128, 102 140"/>
        <F d="M108 116 Q 105 128, 102 138"/>
      </MG>

      {/* === Deltoideus posterior === */}
      <MG slug="deltoideus_posterior" {...evt}>
        <path d="M80 80
                 Q 70 84, 65 94
                 Q 62 104, 66 112
                 Q 72 114, 78 110
                 Q 82 100, 82 86 Z"/>
        <F d="M76 86 Q 70 96, 70 110"/>
        <F d="M80 92 Q 74 100, 74 110"/>
      </MG>
      <MG slug="deltoideus_posterior" {...evt}>
        <path d="M120 80
                 Q 130 84, 135 94
                 Q 138 104, 134 112
                 Q 128 114, 122 110
                 Q 118 100, 118 86 Z"/>
        <F d="M124 86 Q 130 96, 130 110"/>
        <F d="M120 92 Q 126 100, 126 110"/>
      </MG>

      {/* === Rhomboideus === */}
      <MG slug="rhomboideus" {...evt}>
        <path d="M90 92 L 110 92 Q 112 102, 108 110 L 92 110 Q 88 102, 90 92 Z"/>
        <F d="M92 96 L 108 96"/>
        <F d="M92 102 L 108 102"/>
      </MG>

      {/* === Latissimus dorsi – V-Fächer mit deutlichem Taper === */}
      <MG slug="latissimus_dorsi" {...evt}>
        <path d="M72 116
                 Q 70 140, 78 170
                 Q 88 180, 99 178
                 L 99 116
                 Q 86 114, 72 116 Z"/>
        <F d="M75 122 Q 80 145, 94 172"/>
        <F d="M80 120 Q 84 145, 96 172"/>
        <F d="M86 118 Q 88 145, 97 172"/>
        <F d="M93 117 Q 93 145, 98 172"/>
      </MG>
      <MG slug="latissimus_dorsi" {...evt}>
        <path d="M128 116
                 Q 130 140, 122 170
                 Q 112 180, 101 178
                 L 101 116
                 Q 114 114, 128 116 Z"/>
        <F d="M125 122 Q 120 145, 106 172"/>
        <F d="M120 120 Q 116 145, 104 172"/>
        <F d="M114 118 Q 112 145, 103 172"/>
        <F d="M107 117 Q 107 145, 102 172"/>
      </MG>

      {/* === Erector spinae (lange Stränge beidseits) === */}
      <MG slug="erector_spinae" {...evt}>
        <path d="M94 115 Q 92 145, 95 184 L 99 184 L 99 115 Z"/>
        <F d="M95 122 L 96 180"/>
        <F d="M97 122 L 97 180"/>
      </MG>
      <MG slug="erector_spinae" {...evt}>
        <path d="M106 115 Q 108 145, 105 184 L 101 184 L 101 115 Z"/>
        <F d="M105 122 L 104 180"/>
        <F d="M103 122 L 103 180"/>
      </MG>

      {/* === Triceps brachii (Hufeisen mit 3 Köpfen, peakig) === */}
      <MG slug="triceps_brachii" {...evt}>
        <path d="M58 110 Q 54 130, 58 152 Q 63 156, 68 152 Q 70 130, 68 110 Q 63 108, 58 110 Z"/>
        <F d="M61 116 Q 60 132, 62 150"/>
        <F d="M65 116 Q 66 132, 65 150"/>
      </MG>
      <MG slug="triceps_brachii" {...evt}>
        <path d="M142 110 Q 146 130, 142 152 Q 137 156, 132 152 Q 130 130, 132 110 Q 137 108, 142 110 Z"/>
        <F d="M139 116 Q 140 132, 138 150"/>
        <F d="M135 116 Q 134 132, 135 150"/>
      </MG>

      {/* === Extensor carpi === */}
      <MG slug="extensor_carpi" {...evt}>
        <path d="M52 170 Q 49 195, 52 222 Q 58 224, 62 222 Q 64 195, 62 170 Z"/>
        <F d="M55 178 L 56 220"/>
        <F d="M59 178 L 60 220"/>
      </MG>
      <MG slug="extensor_carpi" {...evt}>
        <path d="M148 170 Q 151 195, 148 222 Q 142 224, 138 222 Q 136 195, 138 170 Z"/>
        <F d="M145 178 L 144 220"/>
        <F d="M141 178 L 140 220"/>
      </MG>

      {/* === Gluteus medius (oberer äußerer Pol) === */}
      <MG slug="gluteus_medius" {...evt}>
        <path d="M78 208 Q 75 215, 78 224 L 89 224 Q 90 214, 88 208 Z"/>
        <F d="M80 212 L 87 222"/>
      </MG>
      <MG slug="gluteus_medius" {...evt}>
        <path d="M122 208 Q 125 215, 122 224 L 111 224 Q 110 214, 112 208 Z"/>
        <F d="M120 212 L 113 222"/>
      </MG>

      {/* === Gluteus maximus – große runde Halbkugel === */}
      <MG slug="gluteus_maximus" {...evt}>
        <path d="M78 218
                 Q 73 234, 76 252
                 Q 84 258, 96 258
                 L 99 258
                 L 99 218
                 Q 88 215, 78 218 Z"/>
        <F d="M82 226 Q 88 240, 96 254"/>
        <F d="M86 224 Q 90 240, 97 254"/>
        <F d="M91 222 Q 93 240, 98 254"/>
      </MG>
      <MG slug="gluteus_maximus" {...evt}>
        <path d="M122 218
                 Q 127 234, 124 252
                 Q 116 258, 104 258
                 L 101 258
                 L 101 218
                 Q 112 215, 122 218 Z"/>
        <F d="M118 226 Q 112 240, 104 254"/>
        <F d="M114 224 Q 110 240, 103 254"/>
        <F d="M109 222 Q 107 240, 102 254"/>
      </MG>

      {/* === Biceps femoris (längliche Wölbung außen) === */}
      <MG slug="biceps_femoris" {...evt}>
        <path d="M80 262 Q 76 282, 80 310 Q 86 312, 92 310 Q 93 282, 92 262 Z"/>
        <F d="M83 270 Q 82 286, 84 308"/>
        <F d="M87 270 Q 88 286, 88 308"/>
        <F d="M90 270 Q 91 286, 90 308"/>
      </MG>
      <MG slug="biceps_femoris" {...evt}>
        <path d="M120 262 Q 124 282, 120 310 Q 114 312, 108 310 Q 107 282, 108 262 Z"/>
        <F d="M117 270 Q 118 286, 116 308"/>
        <F d="M113 270 Q 112 286, 112 308"/>
        <F d="M110 270 Q 109 286, 110 308"/>
      </MG>

      {/* === Semitendinosus (innen, parallel zu Biceps femoris) === */}
      <MG slug="semitendinosus" {...evt}>
        <path d="M93 262 Q 91 282, 93 310 L 99 310 Q 99 282, 99 262 Z"/>
        <F d="M94 270 L 95 308"/>
        <F d="M97 270 L 97 308"/>
      </MG>
      <MG slug="semitendinosus" {...evt}>
        <path d="M107 262 Q 109 282, 107 310 L 101 310 Q 101 282, 101 262 Z"/>
        <F d="M106 270 L 105 308"/>
        <F d="M103 270 L 103 308"/>
      </MG>

      {/* === Gastrocnemius (2 herzförmige Köpfe) === */}
      <MG slug="gastrocnemius" {...evt}>
        <path d="M85 320 Q 82 342, 89 360 Q 94 362, 96 360 Q 96 342, 96 320 Z"/>
        <F d="M88 326 Q 87 346, 92 358"/>
        <F d="M92 326 Q 93 346, 94 358"/>
      </MG>
      <MG slug="gastrocnemius" {...evt}>
        <path d="M115 320 Q 118 342, 111 360 Q 106 362, 104 360 Q 104 342, 104 320 Z"/>
        <F d="M112 326 Q 113 346, 108 358"/>
        <F d="M108 326 Q 107 346, 106 358"/>
      </MG>

      {/* === Soleus === */}
      <MG slug="soleus" {...evt}>
        <path d="M86 362 Q 84 380, 87 395 L 96 395 Q 96 380, 96 362 Z"/>
        <F d="M88 368 L 90 393"/>
        <F d="M92 368 L 93 393"/>
      </MG>
      <MG slug="soleus" {...evt}>
        <path d="M114 362 Q 116 380, 113 395 L 104 395 Q 104 380, 104 362 Z"/>
        <F d="M112 368 L 110 393"/>
        <F d="M108 368 L 107 393"/>
      </MG>

      {/* === LANDMARKS === */}
      {/* Wirbelsäulenrinne (vom Nacken bis Sakrum) */}
      <L d="M100 64 L 100 90"/>
      <L d="M100 90 L 100 184"/>
      {/* Schulterblatt-Innenränder (medial border of scapula) */}
      <L d="M91 92 Q 93 100, 92 108"/>
      <L d="M109 92 Q 107 100, 108 108"/>
      {/* Beckenkamm */}
      <L d="M85 214 Q 92 212, 99 214"/>
      <L d="M115 214 Q 108 212, 101 214"/>
      {/* Sakrum-Dreieck */}
      <L d="M97 200 L 100 212 L 103 200"/>
      {/* Gluteal-Trennung */}
      <L d="M100 218 L 100 258"/>
      {/* Knie-Kniekehle */}
      <L d="M91 312 Q 96 314, 99 312"/>
      <L d="M109 312 Q 104 314, 101 312"/>
      {/* Achillessehne */}
      <L d="M90 395 L 92 410"/>
      <L d="M110 395 L 108 410"/>
    </svg>
  );
}
