// Schlägt Dehnübungen basierend auf den am stärksten belasteten Muskeln vor.

import { computeMuscleState } from './regeneration.js';

// Mapping: Muskel-Slug -> Stretch-Key (i18n)
const STRETCH_FOR_MUSCLE = {
  pectoralis_major:     'stretch.chest_doorway',
  iliopsoas:            'stretch.hipflexor',
  rectus_femoris:       'stretch.quad_standing',
  vastus_lateralis:     'stretch.quad_standing',
  vastus_medialis:      'stretch.quad_standing',
  biceps_femoris:       'stretch.hamstring_sit',
  semitendinosus:       'stretch.hamstring_sit',
  semimembranosus:      'stretch.hamstring_sit',
  latissimus_dorsi:     'stretch.lat_wall',
  gastrocnemius:        'stretch.calf_step',
  soleus:               'stretch.calf_step',
  gluteus_maximus:      'stretch.glute_pigeon',
  gluteus_medius:       'stretch.glute_pigeon',
  triceps_brachii:      'stretch.tricep_overhead',
  deltoideus_anterior:  'stretch.shoulder_cross',
  deltoideus_posterior: 'stretch.shoulder_cross',
  erector_spinae:       'stretch.cat_cow',
};

export async function suggestStretches(userId) {
  const state = await computeMuscleState(userId);
  const top = state
    .filter(s => s.fatigue > 0.2)
    .sort((a, b) => b.fatigue - a.fatigue)
    .slice(0, 12);

  const seen = new Set();
  const out = [];
  for (const m of top) {
    const key = STRETCH_FOR_MUSCLE[m.muscle_slug];
    if (key && !seen.has(key)) {
      seen.add(key);
      out.push({
        stretch_key: key,
        muscle_slug: m.muscle_slug,
        hold_seconds: m.fatigue > 0.7 ? 30 : 20,
        each_side: true,
      });
    }
    if (out.length >= 6) break;
  }
  // Mindestens Katze-Kuh + Brust für jede Session
  if (out.length === 0) {
    out.push({ stretch_key: 'stretch.cat_cow', muscle_slug: 'erector_spinae', hold_seconds: 20, each_side: false });
    out.push({ stretch_key: 'stretch.chest_doorway', muscle_slug: 'pectoralis_major', hold_seconds: 20, each_side: true });
  }
  return out;
}
