import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Image, ListGroup, Spinner } from "react-bootstrap";
import { getRecipeInfo, getRecipes } from "../api/recipes";
import { CATEGORY_SEARCH_KEY } from "../common/constants";

type Recipe = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strArea: string;
  strCategory: string;
  strInstructions: string;
  [key: string]: string | null;
};

const RecipeInfoPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [relatedByCategory, setRelatedByCategory] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await getRecipeInfo(id!);
        const fetchedRecipe = res.data.meals[0];
        setRecipe(fetchedRecipe);

        if (fetchedRecipe?.strCategory) {
          const query = `${CATEGORY_SEARCH_KEY}=${fetchedRecipe.strCategory}`;
          const related = await getRecipes(query);
          setRelatedByCategory(related.data.meals);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  const extractIngredients = () => {
    if (!recipe) return [];
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      if (ingredient) {
        ingredients.push(ingredient);
      }
    }
    return ingredients;
  };

  const handleFilter = (type: "i" | "a" | "c", value: string) => {
    navigate(`/?${type}=${value}`);
  };

  if (loading || !recipe) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  const ingredients = extractIngredients();

  return (
    <Container fluid className="mt-4">
      <Row>
        <Col md={9}>
          <Row>
            <Col md={4}>
              <Image src={recipe.strMealThumb} fluid rounded />
            </Col>
            <Col md={8}>
              <h2>{recipe.strMeal}</h2>
              <p className="text-muted">
                <span
                  style={{ cursor: "pointer", color: "blue" }}
                  onClick={() => handleFilter("a", recipe.strArea!)}
                >
                  {recipe.strArea}
                </span>
              </p>
              <h4>Instructions</h4>
              <p>{recipe.strInstructions}</p>
              <h4>Ingredients</h4>
              <ListGroup>
                {ingredients.map((ing, idx) => (
                  <ListGroup.Item
                    key={idx}
                    action
                    onClick={() => handleFilter("i", ing!)}
                  >
                    {ing}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
        </Col>
        <Col md={3}>
          <h5 className="mb-3">More in "{recipe.strCategory}"</h5>
          <ListGroup className="mb-3">
            {relatedByCategory
              .filter((r) => r.idMeal !== recipe.idMeal)
              .map((r) => (
                <ListGroup.Item
                  key={r.idMeal}
                  action
                  onClick={() => handleFilter("c", recipe.strCategory!)}
                >
                  {r.strMeal}
                </ListGroup.Item>
              ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default RecipeInfoPage;
