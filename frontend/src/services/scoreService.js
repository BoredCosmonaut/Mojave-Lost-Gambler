import api from "./api";

export async function submitScore(player_name,score,region) {
    try {
        const res = await api.post(`/scores/submitScore`, {player_name,score,region});
        return res.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export async function getTopScores() {
    try {
        const res = await api.get('/scores/leaderboard');
        console.log(res.data)
        return res.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}