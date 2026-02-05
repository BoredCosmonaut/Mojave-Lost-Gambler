import api from "./api";

export async function getRound() {
    try {
        const res = await api.get(`/game/round`);
        return res.data
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export async function submitGuess(data) {
    try {
        const res = await api.post('/game/guess',data)
    } catch (err) {
        console.error(err)
        throw err;
    }
}