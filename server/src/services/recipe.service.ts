import axios from "axios";
import { RECIPE_API_BASE_URL } from "../common/constants";
import { ParsedQs } from 'qs';
import { isEmptyObject } from "../common/utils";

async function getAllRecipes() {
  try {
    const res = await axios.get(`${RECIPE_API_BASE_URL}search.php?s=`);
    return res.data;
  } catch (err) {
    return err;
  }
}

async function filterRecipes(query: ParsedQs) {
  try {
    const res = await axios.get(`${RECIPE_API_BASE_URL}filter.php?`, {
      params: query,
    });
    return res.data;
  } catch (err) {
    return err;
  }
}

export async function getRecipes(query: ParsedQs) {
  if (isEmptyObject(query)) {
    return await getAllRecipes();
  }

  return await filterRecipes(query);
}

export async function getRecipeInfo(id: string) {
  try { 
    const res = await axios.get(`${RECIPE_API_BASE_URL}lookup.php?i=${id}`);
    return res.data;
  } catch (err) {
    return err;
  }
}
