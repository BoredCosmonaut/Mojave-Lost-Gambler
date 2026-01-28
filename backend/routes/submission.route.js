import { Router } from "express";
import { submitImage } from "../controllers/submission.controller";
import { upload } from "../middleware/upload";

const router = Router();
router.post('/submitImage',upload.single('image'),submitImage);

export default router;