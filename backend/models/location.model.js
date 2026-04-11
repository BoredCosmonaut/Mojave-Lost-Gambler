import { pool } from "../db/index.js";

export async function getRandomLocation(region) {
    const result = await pool.query(`SELECT * FROM locations WHERE region = $1 ORDER BY RANDOM() LIMIT 1 `, [region])
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

export async function dbDeleteLocation(id) {
    const result = await pool.query('DELETE FROM locations WHERE id = $1', [id]);
    return result.rowCount > 0; 
}
export async function createLocationFromSubmission(sub) {
    await pool.query(`INSERT INTO locations(image_url,x,y,region) VALUES ($1,$2,$3,$4)`, [sub.image_url,sub.x,sub.y,sub.region]);
}