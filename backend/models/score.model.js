import { pool } from "../db/index.js";

export async function submitScore({ player_name, score,region }) {
    console.log(`submit score data:`, player_name, score);
    try {
        await pool.query(
            `INSERT INTO scores (player_name, score,region) VALUES ($1, $2, $3)`,
            [player_name, score,region]
        );
    } catch (err) {
        console.error("Database Error:", err);
        throw err;
    }
}

export async function getTopScores() {
    try {
        const query = `
            SELECT DISTINCT ON (region) 
                id, player_name, score, region, created_at
            FROM scores 
            ORDER BY region, score DESC
        `;
        const result = await pool.query(query);
        return result.rows; 
    } catch (err) {
        console.error("Error fetching regional high scores:", err);
        throw err;
    }
}