import axios from "axios";
import { BACKEND_BASE_URL } from "../common/constants";

export async function getRecipes(query: string | undefined) {
  const res = await axios.get(`${BACKEND_BASE_URL}/recipes?${query}`);
  return res;
}

export async function getRecipeInfo(id: string) {
  const res = await axios.get(`${BACKEND_BASE_URL}/recipes/${id}`);
  return res;
}