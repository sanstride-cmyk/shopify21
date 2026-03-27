import { Router, type IRouter } from "express";
import healthRouter from "./health";
import adCreativeRouter from "./ad-creative";

const router: IRouter = Router();

router.use(healthRouter);
router.use(adCreativeRouter);

export default router;
