import {pool} from '../db/index.js'

export async function getAdminByEmail(email) {
    try {
        const result = await pool.query('SELECT * FROM admins WHERE email = $1', [email]);
        const user = result.rows[0];
        if(!user) return null;
        return{
            id:user.id,
            email:user.email,
            role:user.role,
            password: user.password_hash
        }
    } catch (err) {
        console.error('Error while getting admin info',err);
        return null
    }
}