import express from "express";
import { createOffer } from "../controllers/offerController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { getAllOffers, createOffer, getOfferById } from "../controllers/offerController.js";


const router = express.Router();

router.post("/", verifyToken, createOffer);
router.get("/", getAllOffers);
router.get("/:id", getOfferById);

export default router;
