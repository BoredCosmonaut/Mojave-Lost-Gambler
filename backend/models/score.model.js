import { pool } from "../db/index.js";

export async function submitScore(data) {
    console.log(data);
    const {player_name,score} = data;
    try {
        await pool.query(`INSERT INTO scores (player_name,score) VALUES ($1,$2)`,[player_name,score]);
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