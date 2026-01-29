import { Router } from "express";
import { createScore,leaderboard} from "../controllers/score.controller.js";

const router = Router()

router.post('/submitScore',createScore);
router.get('/leaderboard',leaderboard);

export default router;