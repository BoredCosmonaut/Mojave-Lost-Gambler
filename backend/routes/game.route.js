import { Router} from "express";
import { startRound,submitGuess } from "../controllers/game.controller.js";

const router = Router()

router.get('/round',startRound);
router.post('/guess',submitGuess);

export default router;