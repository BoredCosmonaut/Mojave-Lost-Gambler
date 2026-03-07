import jwt from 'jsonwebtoken';
import 'dotenv/config';
export function generateToken({id,email,role}) {
    return jwt.sign({id,email,role},process.env.JWT_SECRET,{
        expiresIn:'1d'
    })
}