import React, { useCallback, useEffect, useState } from "react";
import RecipeItem from "../components/RecipeItem";
import { getRecipes } from "../api/recipes";
import { INGREDIENT_SEARCH_KEY, COUNTRY_SEARCH_KEY, CATEGORY_SEARCH_KEY } from "../common/constants";
import { useSearchParams } from "react-router-dom";

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

const RecipeListPage: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchParams] = useSearchParams();
  const [ingredient, setIngredient] = useState(searchParams.get(INGREDIENT_SEARCH_KEY) || "");
  const [country, setCountry] = useState(searchParams.get(COUNTRY_SEARCH_KEY) || "");
  const [category, setCategory] = useState(searchParams.get(CATEGORY_SEARCH_KEY) || "");

  const getTitle = () => {
    if (ingredient) return `Recipes with ${ingredient}`;
    if (country) return `Recipes from ${country}`;
    if (category) return `${category} Recipes`;
    return "All Recipes";
  };

  const fetchRecipes = useCallback(async () => {
    let query: string = "";
    if (ingredient) query = `${INGREDIENT_SEARCH_KEY}=${ingredient}`;
    if (country) query = `${COUNTRY_SEARCH_KEY}=${country}`;
    if (category) query = `${CATEGORY_SEARCH_KEY}=${category}`;

    try {
      const res = await getRecipes(query);
      setRecipes(res.data.meals || []);
    } catch (err) {
      console.error("Error fetching recipes:", err);
    }
  }, [category, country, ingredient]);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">{getTitle()}</h2>
      <form className="row g-3 mb-4">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Ingredient"
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
      </form>
      <div className="row">
        {recipes.map((recipe) => (
          <RecipeItem
            key={recipe.idMeal}
            id={recipe.idMeal}
            name={recipe.strMeal}
            thumbnail={recipe.strMealThumb}
          />
        ))}
      </div>
    </div>
  );
};

export default RecipeListPage;
