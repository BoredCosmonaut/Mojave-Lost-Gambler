import { Router } from "express";
import { createScore,leaderboard} from "../controllers/score.controller";

const router = Router()

router.post('/submitScore',createScore);
router.get('/leaderboard',leaderboard);

export default router;