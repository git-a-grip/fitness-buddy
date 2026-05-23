// Stilisierte anatomische Muskel-SVGs (vorne / hinten).
// Jede <path data-muscle="..."> entspricht einem Muskel-Slug aus der DB.
// Hover zeigt Tooltip mit lateinischem + lokalisiertem Namen.
//
// Hinweis: Pfade sind vereinfachte, schematische Darstellungen
// (keine medizinische Genauigkeit, aber anatomisch erkennbar).

export function FrontBodySVG({ onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke }) {
  return (
    <svg className="body-svg" viewBox="0 0 200 460" xmlns="http://www.w3.org/2000/svg">
      {/* Körperumriss */}
      <path className="outline" d="M100 18
        C 88 18, 80 28, 80 42
        C 80 52, 84 60, 90 64
        L 80 80
        L 65 92 L 55 110 L 50 135 L 50 165
        L 55 180 L 60 165 L 62 145
        L 70 145 L 76 175 L 80 220 L 78 270
        L 75 320 L 73 380 L 78 440 L 88 450 L 96 450 L 98 405 L 100 360
        L 102 405 L 104 450 L 112 450 L 122 440 L 127 380 L 125 320
        L 122 270 L 120 220 L 124 175 L 130 145 L 138 145 L 140 165 L 145 180
        L 150 165 L 150 135 L 145 110 L 135 92 L 120 80 L 110 64
        C 116 60, 120 52, 120 42 C 120 28, 112 18, 100 18 Z"/>

      {/* Hals/Schulter Verbinder */}
      <path className="outline" d="M90 64 L 80 80 M 110 64 L 120 80"/>

      {/* === Pectoralis major (Brust) === */}
      <Muscle id="pectoralis_major_l" slug="pectoralis_major"
        d="M82 86 Q 76 100, 80 118 Q 92 124, 98 118 L 98 96 Q 92 88, 82 86 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>
      <Muscle id="pectoralis_major_r" slug="pectoralis_major"
        d="M118 86 Q 124 100, 120 118 Q 108 124, 102 118 L 102 96 Q 108 88, 118 86 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>

      {/* Pectoralis minor (sichtbar nicht – als kleines Feld unter Pec major Position) */}
      <Muscle slug="pectoralis_minor"
        d="M88 116 Q 88 124, 92 126 L 96 122 L 96 116 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>
      <Muscle slug="pectoralis_minor"
        d="M112 116 Q 112 124, 108 126 L 104 122 L 104 116 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>

      {/* === Serratus anterior === */}
      <Muscle slug="serratus_anterior"
        d="M75 122 L 80 138 L 82 152 L 78 152 L 72 138 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>
      <Muscle slug="serratus_anterior"
        d="M125 122 L 120 138 L 118 152 L 122 152 L 128 138 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>

      {/* === Deltoideus anterior === */}
      <Muscle slug="deltoideus_anterior"
        d="M78 78 Q 64 88, 64 106 Q 70 108, 76 102 L 80 88 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>
      <Muscle slug="deltoideus_anterior"
        d="M122 78 Q 136 88, 136 106 Q 130 108, 124 102 L 120 88 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>

      {/* === Deltoideus lateralis === */}
      <Muscle slug="deltoideus_lateralis"
        d="M62 100 Q 58 112, 62 124 L 70 122 L 72 108 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>
      <Muscle slug="deltoideus_lateralis"
        d="M138 100 Q 142 112, 138 124 L 130 122 L 128 108 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>

      {/* === Biceps brachii === */}
      <Muscle slug="biceps_brachii"
        d="M58 125 L 60 152 L 67 153 L 68 128 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>
      <Muscle slug="biceps_brachii"
        d="M142 125 L 140 152 L 133 153 L 132 128 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>

      {/* === Brachialis === */}
      <Muscle slug="brachialis"
        d="M58 150 L 56 168 L 62 170 L 64 152 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>
      <Muscle slug="brachialis"
        d="M142 150 L 144 168 L 138 170 L 136 152 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>

      {/* === Brachioradialis (Unterarm außen vorne) === */}
      <Muscle slug="brachioradialis"
        d="M54 168 L 52 192 L 58 195 L 62 172 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>
      <Muscle slug="brachioradialis"
        d="M146 168 L 148 192 L 142 195 L 138 172 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>

      {/* === Flexor carpi (Unterarmbeuger) === */}
      <Muscle slug="flexor_carpi"
        d="M58 195 L 60 222 L 66 222 L 64 195 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>
      <Muscle slug="flexor_carpi"
        d="M142 195 L 140 222 L 134 222 L 136 195 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>

      {/* === Rectus abdominis (6-pack) === */}
      <Muscle slug="rectus_abdominis"
        d="M92 130 L 108 130 L 108 195 L 92 195 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>

      {/* === Obliquus externus === */}
      <Muscle slug="obliquus_externus"
        d="M82 145 L 90 145 L 92 195 L 80 195 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>
      <Muscle slug="obliquus_externus"
        d="M118 145 L 110 145 L 108 195 L 120 195 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>

      {/* Iliopsoas (Hüftbeuger – am unteren Bauch sichtbar gemacht) */}
      <Muscle slug="iliopsoas"
        d="M88 195 L 96 195 L 96 215 L 86 210 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>
      <Muscle slug="iliopsoas"
        d="M112 195 L 104 195 L 104 215 L 114 210 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>

      {/* === Quadrizeps-Komponenten === */}
      {/* Rectus femoris (mittig vorne) */}
      <Muscle slug="rectus_femoris"
        d="M93 220 L 102 220 L 100 295 L 95 295 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>
      <Muscle slug="rectus_femoris"
        d="M107 220 L 98 220 L 100 295 L 105 295 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>

      {/* Vastus lateralis (außen) */}
      <Muscle slug="vastus_lateralis"
        d="M80 222 L 93 222 L 95 295 L 82 290 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>
      <Muscle slug="vastus_lateralis"
        d="M120 222 L 107 222 L 105 295 L 118 290 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>

      {/* Vastus medialis (innen Knie) */}
      <Muscle slug="vastus_medialis"
        d="M95 270 L 100 270 L 100 296 L 93 294 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>
      <Muscle slug="vastus_medialis"
        d="M105 270 L 100 270 L 100 296 L 107 294 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>

      {/* Vastus intermedius (verborgen, schmale Streifen) */}
      <Muscle slug="vastus_intermedius"
        d="M91 240 L 94 240 L 94 260 L 91 260 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>
      <Muscle slug="vastus_intermedius"
        d="M109 240 L 106 240 L 106 260 L 109 260 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>

      {/* Sartorius (schräg verlaufender Streifen) */}
      <Muscle slug="sartorius"
        d="M90 220 L 94 222 L 100 285 L 96 286 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>
      <Muscle slug="sartorius"
        d="M110 220 L 106 222 L 100 285 L 104 286 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>

      {/* Adduktoren (innen oben) */}
      <Muscle slug="adductor_longus"
        d="M96 220 L 100 220 L 100 256 L 94 254 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>
      <Muscle slug="adductor_longus"
        d="M104 220 L 100 220 L 100 256 L 106 254 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>

      {/* === Tibialis anterior (Schienbein) === */}
      <Muscle slug="tibialis_anterior"
        d="M88 320 L 96 320 L 96 370 L 88 370 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>
      <Muscle slug="tibialis_anterior"
        d="M112 320 L 104 320 L 104 370 L 112 370 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>
    </svg>
  );
}

export function BackBodySVG({ onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke }) {
  return (
    <svg className="body-svg" viewBox="0 0 200 460" xmlns="http://www.w3.org/2000/svg">
      <path className="outline" d="M100 18
        C 88 18, 80 28, 80 42
        C 80 52, 84 60, 90 64
        L 80 80
        L 65 92 L 55 110 L 50 135 L 50 165
        L 55 180 L 60 165 L 62 145
        L 70 145 L 76 175 L 80 220 L 78 270
        L 75 320 L 73 380 L 78 440 L 88 450 L 96 450 L 98 405 L 100 360
        L 102 405 L 104 450 L 112 450 L 122 440 L 127 380 L 125 320
        L 122 270 L 120 220 L 124 175 L 130 145 L 138 145 L 140 165 L 145 180
        L 150 165 L 150 135 L 145 110 L 135 92 L 120 80 L 110 64
        C 116 60, 120 52, 120 42 C 120 28, 112 18, 100 18 Z"/>

      {/* === Trapezius (3 Teile) === */}
      <Muscle slug="trapezius_upper"
        d="M92 64 L 108 64 L 118 84 L 96 90 L 82 84 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>
      <Muscle slug="trapezius_middle"
        d="M82 88 L 118 88 L 120 112 L 80 112 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>
      <Muscle slug="trapezius_lower"
        d="M88 112 L 112 112 L 105 138 L 100 144 L 95 138 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>

      {/* === Deltoideus posterior === */}
      <Muscle slug="deltoideus_posterior"
        d="M78 80 Q 64 92, 64 108 L 72 110 L 80 95 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>
      <Muscle slug="deltoideus_posterior"
        d="M122 80 Q 136 92, 136 108 L 128 110 L 120 95 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>

      {/* === Rotator cuff / Schultergürtel === */}
      <Muscle slug="supraspinatus"
        d="M82 84 L 90 86 L 90 92 L 82 92 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>
      <Muscle slug="supraspinatus"
        d="M118 84 L 110 86 L 110 92 L 118 92 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>
      <Muscle slug="infraspinatus"
        d="M72 96 L 88 96 L 88 112 L 72 112 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>
      <Muscle slug="infraspinatus"
        d="M128 96 L 112 96 L 112 112 L 128 112 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>
      <Muscle slug="teres_minor"
        d="M72 113 L 80 113 L 80 120 L 72 120 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>
      <Muscle slug="teres_minor"
        d="M128 113 L 120 113 L 120 120 L 128 120 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>
      <Muscle slug="teres_major"
        d="M72 120 L 84 120 L 84 132 L 72 132 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>
      <Muscle slug="teres_major"
        d="M128 120 L 116 120 L 116 132 L 128 132 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>

      {/* === Rhomboideus (zwischen Schulterblättern) === */}
      <Muscle slug="rhomboideus"
        d="M90 92 L 110 92 L 108 112 L 92 112 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>

      {/* === Latissimus dorsi === */}
      <Muscle slug="latissimus_dorsi"
        d="M72 115 L 92 115 L 95 175 L 78 175 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>
      <Muscle slug="latissimus_dorsi"
        d="M128 115 L 108 115 L 105 175 L 122 175 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>

      {/* === Erector spinae === */}
      <Muscle slug="erector_spinae"
        d="M95 115 L 100 115 L 100 180 L 95 180 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>
      <Muscle slug="erector_spinae"
        d="M105 115 L 100 115 L 100 180 L 105 180 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>

      {/* === Triceps brachii === */}
      <Muscle slug="triceps_brachii"
        d="M58 110 L 68 112 L 70 152 L 60 152 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>
      <Muscle slug="triceps_brachii"
        d="M142 110 L 132 112 L 130 152 L 140 152 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>

      {/* === Extensor carpi (Unterarm hinten) === */}
      <Muscle slug="extensor_carpi"
        d="M52 168 L 60 168 L 62 222 L 52 222 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>
      <Muscle slug="extensor_carpi"
        d="M148 168 L 140 168 L 138 222 L 148 222 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>

      {/* === Gluteus maximus === */}
      <Muscle slug="gluteus_maximus"
        d="M80 215 L 99 215 L 99 256 L 82 254 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>
      <Muscle slug="gluteus_maximus"
        d="M120 215 L 101 215 L 101 256 L 118 254 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>

      {/* === Gluteus medius === */}
      <Muscle slug="gluteus_medius"
        d="M78 208 L 88 208 L 88 220 L 78 220 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>
      <Muscle slug="gluteus_medius"
        d="M122 208 L 112 208 L 112 220 L 122 220 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>

      {/* === Hamstrings === */}
      {/* Biceps femoris (außen) */}
      <Muscle slug="biceps_femoris"
        d="M82 260 L 92 260 L 90 308 L 82 305 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>
      <Muscle slug="biceps_femoris"
        d="M118 260 L 108 260 L 110 308 L 118 305 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>
      {/* Semitendinosus (innen) */}
      <Muscle slug="semitendinosus"
        d="M93 260 L 99 260 L 99 308 L 94 308 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>
      <Muscle slug="semitendinosus"
        d="M107 260 L 101 260 L 101 308 L 106 308 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>
      {/* Semimembranosus */}
      <Muscle slug="semimembranosus"
        d="M92 268 L 96 268 L 96 305 L 92 305 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>
      <Muscle slug="semimembranosus"
        d="M108 268 L 104 268 L 104 305 L 108 305 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>

      {/* === Gastrocnemius (Wadenmuskel) === */}
      <Muscle slug="gastrocnemius"
        d="M86 320 L 96 320 L 95 360 L 86 358 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>
      <Muscle slug="gastrocnemius"
        d="M114 320 L 104 320 L 105 360 L 114 358 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>

      {/* === Soleus (Schollenmuskel, unterhalb der Gastrocnemius) === */}
      <Muscle slug="soleus"
        d="M86 360 L 96 360 L 94 395 L 86 395 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>
      <Muscle slug="soleus"
        d="M114 360 L 104 360 L 106 395 L 114 395 Z"
        {...{onMuscleEnter, onMuscleLeave, onMuscleClick, getFill, getStroke}}/>
    </svg>
  );
}

function Muscle({ slug, d, getFill, getStroke, onMuscleEnter, onMuscleLeave, onMuscleClick }) {
  return (
    <path
      className="muscle"
      data-muscle={slug}
      d={d}
      fill={getFill ? getFill(slug) : undefined}
      stroke={getStroke ? getStroke(slug) : undefined}
      onMouseEnter={(e) => onMuscleEnter && onMuscleEnter(slug, e)}
      onMouseMove={(e)  => onMuscleEnter && onMuscleEnter(slug, e)}
      onMouseLeave={()  => onMuscleLeave && onMuscleLeave()}
      onClick={()       => onMuscleClick && onMuscleClick(slug)}
    />
  );
}
