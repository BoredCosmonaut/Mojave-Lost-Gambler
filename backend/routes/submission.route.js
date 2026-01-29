import { Router } from "express";
import { submitImage } from "../controllers/submission.controller.js";
import { upload } from "../middleware/upload.js";

const router = Router();
router.post('/submitImage',  (req, res, next) => {
    console.log('/api/submissions HIT');
    next();
  },upload.single('image'),submitImage);

export default router;