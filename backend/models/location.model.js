import { pool } from "../db/index.js";

export async function getRandomLocation() {
    const result = await pool.query(`SELECT * FROM locations ORDER BY RANDOM() LIMIT 1`);
    return result.rows[0];
}

export async function getAllLocations() {
    try {
        const result = await pool.query(`SELECT * FROM locations`);
        return result.rows;
    } catch (err) {
        console.error(err)
    }
}

export async function createLocationFromSubmission(sub) {
    await pool.query(`INSERT INTO locations(image_url,x,y,region) VALUES ($1,$2,$3,$4)`, [sub.image_url,sub.x,sub.y,sub.region]);
}