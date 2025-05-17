import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { applyToOffer } from "../controllers/applicationController.js";
import { getMyApplications } from "../controllers/applicationController.js";
import { getReceivedApplications } from "../controllers/applicationController.js";

const router = express.Router();

router.post("/", verifyToken, applyToOffer);
router.get("/me", verifyToken, getMyApplications);
router.get("/received", verifyToken, getReceivedApplications);

export default router;
