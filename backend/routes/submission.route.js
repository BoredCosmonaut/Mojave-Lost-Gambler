import { Router } from "express";
import { cloudSubmitImage } from "../controllers/submission.controller.js";
import { upload } from "../middleware/cloud_upload.js";

const router = Router();
router.post('/submitImage', upload.single('image'), cloudSubmitImage);

export default router;