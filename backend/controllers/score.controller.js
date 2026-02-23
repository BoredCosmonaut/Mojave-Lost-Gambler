import { getTopScores,submitScore } from "../models/score.model.js";

export async function createScore(req, res) {
    const { player_name, score } = req.body; 

    try {
        await submitScore(player_name, score); 
        res.status(201).json({ message: 'Score submitted' });
    } catch (err) {
        res.status(500).json({ error: 'Database error' });
    }
}

export async function leaderboard(req,res) {
    try {
        const board = await getTopScores();
        res.status(200).json({message:'Top scores',scores:board});   
    } catch (err) {
        console.error(err);
    }
}