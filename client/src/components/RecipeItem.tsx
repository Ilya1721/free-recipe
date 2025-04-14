import React from "react";
import { useNavigate } from "react-router-dom";

type RecipeItemProps = {
  id: string;
  name: string;
  thumbnail: string;
};

const RecipeItem: React.FC<RecipeItemProps> = ({ id, name, thumbnail }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/recipe/${id}`);
  };

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100" onClick={handleClick} style={{ cursor: "pointer" }}>
        <img src={thumbnail} className="card-img-top" alt={name} />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
        </div>
      </div>
    </div>
  );
};

export default RecipeItem;
