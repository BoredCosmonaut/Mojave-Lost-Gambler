import api from "./api";

export async function getRound(region) {
    try {
        console.log(`region:`,region)
        const res = await api.get(`/game/round/${region}`);
        console.log(`round loc data`,res)
        return res.data
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export async function submitGuess(data) {
    try {
        const res = await api.post('/game/guess',data)
        return res
    } catch (err) {
        console.error(err)
        throw err;
    }
}