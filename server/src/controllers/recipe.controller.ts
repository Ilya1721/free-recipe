import { Request, Response } from "express";
import { getRecipeInfo, getRecipes } from "../services/recipe.service";

export const getRecipesHandler = async (req: Request, res: Response) => {
  res.json(await getRecipes(req.query));
};

export const getRecipeInfoHandler = async (req: Request, res: Response) => {
  res.json(await getRecipeInfo(req.params.id));
};
