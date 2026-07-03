import { Trip, pickL10n, validateTrip } from '../types/content';

// Auto-discover every trip JSON. Adding content/trips/<slug>.json requires
// zero wiring — it appears on the index and at /trips/<slug> automatically.
const modules = import.meta.glob('../../content/trips/*.json', { eager: true }) as Record<
  string,
  { default: unknown }
>;

const trips: Trip[] = Object.entries(modules)
  .map(([path, mod]) => validateTrip(mod.default, path))
  .sort((a, b) => {
    const ao = a.order ?? Number.MAX_SAFE_INTEGER;
    const bo = b.order ?? Number.MAX_SAFE_INTEGER;
    if (ao !== bo) return ao - bo;
    return (pickL10n('zh', a.date) ?? '').localeCompare(pickL10n('zh', b.date) ?? '');
  });

export function getTrips(): Trip[] {
  return trips;
}

export function getTrip(slug: string): Trip | undefined {
  return trips.find((t) => t.id === slug);
}
