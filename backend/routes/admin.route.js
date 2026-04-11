import { Router } from "express";
import { listPending,approveSubmission,denySubmission,getAllApproved,loginAdmin,deleteLocation } from "../controllers/admin.controller.js";
import {authMiddleware} from'../middleware/authMiddleware.js';
const router = Router();
import {authorizeRoles} from'../middleware/roleMiddleware.js';

router.get('/submissions',authMiddleware,authorizeRoles('admin'),listPending);
router.get('/locations',authMiddleware,authorizeRoles('admin'),getAllApproved);
router.post('/login', loginAdmin)
router.post('/submissions/:id/approve',authMiddleware,authorizeRoles('admin'),approveSubmission);
router.delete('/submissions/:id/deny',authMiddleware,authorizeRoles('admin'),denySubmission);
router.delete('/submissions/:id/delete',authMiddleware,authorizeRoles('admin'),deleteLocation);
export default router;