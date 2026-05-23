import express from 'express';
import cors from 'cors';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import authRoutes from './routes/auth.js';
import muscleRoutes from './routes/muscles.js';
import exerciseRoutes from './routes/exercises.js';
import packageRoutes from './routes/packages.js';
import workoutRoutes from './routes/workouts.js';
import statsRoutes from './routes/stats.js';
import i18nRoutes from './routes/i18n.js';
import knowledgeRoutes from './routes/knowledge.js';
import planRoutes from './routes/plans.js';
import suggestionRoutes from './routes/suggestions.js';
import pushRoutes from './routes/push.js';
import calendarRoutes from './routes/calendar.js';
import intakeRoutes from './routes/intakes.js';
import stretchRoutes from './routes/stretching.js';
import { startReminderLoop } from './services/push.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.use('/api/auth',         authRoutes);
app.use('/api/muscles',      muscleRoutes);
app.use('/api/exercises',    exerciseRoutes);
app.use('/api/packages',     packageRoutes);
app.use('/api/workouts',     workoutRoutes);
app.use('/api/stats',        statsRoutes);
app.use('/api/i18n',         i18nRoutes);
app.use('/api/knowledge',    knowledgeRoutes);
app.use('/api/plans',        planRoutes);
app.use('/api/suggestions',  suggestionRoutes);
app.use('/api/push',         pushRoutes);
app.use('/api/calendar',     calendarRoutes);
app.use('/api/intakes',      intakeRoutes);
app.use('/api/stretching',   stretchRoutes);

// Static frontend (built React)
const publicDir = path.join(__dirname, '..', 'public');
app.use(express.static(publicDir));
app.get('*', (_req, res) => res.sendFile(path.join(publicDir, 'index.html')));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`fitness-buddy backend listening on :${port}`);
  startReminderLoop();
});
