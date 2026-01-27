import { getRandomLocation } from "../models/location.model";
import { calculateDistance,calculateScore } from "../utils/scoring";

export async function startRoubd(req,res) {
    try {
        const location = await getRandomLocation();
        res.status(200).json({message: 'New round started',location:location});
    } catch (err) {
        console.error('Error while getting location:',err);
    }
}

export async function submitGuess(req,res) {
    const {actualX,actualY,guessX,guessY} = req.body;
    const distance = calculateDistance({x:guessX,y:guessY}, {x:actualX,y:actualY});
    res.status(200).json({message:'Calculated score and distance!',distance:distance,score:calculateScore(distance)});
}

