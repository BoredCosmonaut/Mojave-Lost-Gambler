import { pool } from "../db/index.js";

export async function getRandomLocation() {
    const result = await pool.query(`SELECT id,image_url FROM locations ORDER BY RANDOM() LIMIT 1`);
    return result.rows[0];
}

export async function createLocationFromSubmission(sub) {
    await pool.query(`INSERT INTO locations(image_url,x,y) VALUES ($1,$2,$3)`, [sub.image_url,sub.x,sub.y]);
}