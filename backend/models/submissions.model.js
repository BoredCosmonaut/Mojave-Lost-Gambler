import { pool } from "../db/index.js";

export async function createSubmission(data) {
    const { image_url, x, y, region } = data;
    try {
        const query = `
            INSERT INTO submissions (image_url, x, y, region) 
            VALUES ($1, $2, $3, $4) 
            RETURNING *
        `;
        
        const result = await pool.query(query, [image_url, x, y, region]);
        
        return result.rows[0];        
    } catch (err) {
        console.error("DATABASE_ERROR:", err);
        throw err; 
    }
}

export async function getPendingSubmissions() {
    try {
        const result = await pool.query(`SELECT * FROM submissions WHERE status = 'Pending'`);
        return result.rows;
    } catch (err) {
        console.error(err);
    }
}

export async function getSubmissionById(id) {
    try {
        const result = await pool.query(`SELECT * FROM submissions WHERE id = $1`,[id]);
        return result.rows[0];
    } catch (err) {
        console.error(err);
    }
}

export async function updateSubmissionStatus(id,status) {
    try {
        await pool.query(`UPDATE submissions SET status = $1 WHERE id = $2`,[status,id]);
    } catch (err) {
        console.error(err);
    }
}