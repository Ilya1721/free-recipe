import { Request, Response } from "express";
import { getRecipes } from "../services/recipe.service";

export const getRecipesReq = (req: Request, res: Response) => {
  res.json(getRecipes(req.query));
};
