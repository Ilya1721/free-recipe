import { Router } from "express";
import { getRecipesReq } from "../controllers/recipe.controller";

const router = Router();

router.get("/", getRecipesReq);

export default router;