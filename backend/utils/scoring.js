export function calculateDistance(a,b) {
    return Math.hypot(a.x-b.x, a.y-b.y);
}
const MAX_SCORE = 5000;
const MAX_DISTANCE = 260000 * Math.SQRT2; 

export function calculateScore(distance) {
  const scaled = MAX_SCORE * (1 - distance / MAX_DISTANCE);
  return Math.max(0, Math.round(scaled));
}
