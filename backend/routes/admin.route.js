import { Router } from "express";
import { listPending,approveSubmission,denySubmission } from "../controllers/admin.controller.js";

const router = Router();

router.get('/submissions',listPending);
router.post('submissions/:id/approve',approveSubmission);
router.post('/submissions/:id/deny',denySubmission);

export default router;