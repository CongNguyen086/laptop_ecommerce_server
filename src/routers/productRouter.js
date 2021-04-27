import { Router } from "express";
import { productController } from "../controllers";

const router = Router();
router.get('/getFilterOptions', productController.getFilterOptions);
router.post('/findAll/:categoryId', productController.findProductByFilter);

export default router;