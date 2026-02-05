import api from "./api";

export async function submitScore(player_name,score) {
    try {
        const res = await api.post(`/scores/submitScore`, {player_name,score});
        return res.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export async function getTopScores() {
    try {
        const res = await api.get('/scores/leaderboard');
        return res.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}