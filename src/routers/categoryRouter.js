import { Router } from "express";
import { getAllCategory } from "../controllers/categoryController.js";

const router = Router();
router.get('/', getAllCategory);

export default router;