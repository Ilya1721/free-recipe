import { Router } from "express";
import {
  getRecipeInfoHandler,
  getRecipesHandler,
} from "../controllers/recipe.controller";

const router = Router();

router.get("/", getRecipesHandler);
router.get("/:id", getRecipeInfoHandler);

export default router;
