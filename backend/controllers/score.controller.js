import { getTopScores,submitScore } from "../models/score.model.js";

export async function createScore(req,res) {
    console.log(req.body)
    try {
        await submitScore(req.body);
        res.status(201).json({message:'Score submitted'})
    } catch (err) {
        console.error(err);
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