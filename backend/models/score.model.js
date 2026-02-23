import { pool } from "../db/index.js";

export async function submitScore({ player_name, score }) {
    console.log(`submit score data:`, player_name, score);
    try {
        await pool.query(
            `INSERT INTO scores (player_name, score) VALUES ($1, $2)`,
            [player_name, score]
        );
    } catch (err) {
        console.error("Database Error:", err);
        throw err; // Throw so the controller knows it failed
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