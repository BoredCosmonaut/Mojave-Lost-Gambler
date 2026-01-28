import { Router, Router } from "express";
import { startRound,submitGuess } from "../controllers/game.controller";

const router = Router()

router.get('/round',startRound);
router.post('/guess',submitGuess);

export default router;