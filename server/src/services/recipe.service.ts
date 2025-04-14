import axios from "axios";
import { RECIPE_API_BASE_URL } from "../common/constants";
import { ParsedQs } from 'qs';

async function getAllRecipes() {
  try {
    return await axios.get(`${RECIPE_API_BASE_URL}search.php?s=`);
  } catch (err) {
    return err;
  }
}

async function filterRecipes(query: ParsedQs) {
  try {
    return await axios.get(`${RECIPE_API_BASE_URL}filter.php?`, {
      params: query,
    });
  } catch (err) {
    return err;
  }
}

export async function getRecipes(query: ParsedQs) {
  if (!query) {
    return await getAllRecipes();
  }

  return await filterRecipes(query);
}
