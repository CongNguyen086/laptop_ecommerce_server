import { Router } from "express";
import { productController } from "../controllers";

const router = Router();
router.get('/getFilterOptions', productController.getFilterOptions);

export default router;