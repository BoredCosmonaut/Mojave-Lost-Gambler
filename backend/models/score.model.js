import { pool } from "../db/index.js";

export async function createScore(data) {
    const {playerName,score,distance} = data;
    try {
        await pool.query(`INSERT INTO scores (playerName,score,distance) VALUES ($1,$2,$3)`,[playerName,score,distance]);
    } catch (err) {
        console.error(err);
    }
}

export async function getTopScores(limit = 5) {
    try {
        const result = await pool.query(`SELECT * FROM scores ORDER BY score DESC LIMIT $1`, [limit]);
        return result.rows[0];
    } catch (err) {
        console.error(err);
    }
}