import { Router } from "express";
import { createScore,leaderboard} from "../controllers/score.controller.js";

const router = Router()

router.get('/leaderboard',leaderboard);
router.post('/submitScore',createScore);

export default router;