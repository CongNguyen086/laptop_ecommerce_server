import { Router } from "express";
import { categoryController } from "../controllers";

const router = Router();
router.get('/all', categoryController.getAllCategory);

export default router;