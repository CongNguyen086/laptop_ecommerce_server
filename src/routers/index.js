import { Router } from 'express';
import categoryRouter from './categoryRouter.js';
import productRouter from './productRouter.js';

const router = Router();
router.use("/category", categoryRouter);
router.use("/product", productRouter);

export default router;