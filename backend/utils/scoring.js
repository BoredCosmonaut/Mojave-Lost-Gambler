export function calculateDistance(a,b) {
    return Math.hypot(a.x-b.x, a.y-b.y);
}

export function calculateScore(distance) {
    return Math.max(0,Math.round(5000- distance * 10));
}
