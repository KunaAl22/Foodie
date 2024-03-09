import React, { useState, useEffect } from 'react';
import './style.css';
function RecipeCard({ recipe, onFavoriteToggle }) {
  const [apiData, setApiData] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleIngredientClick = async (ingredientName) => {
    try {
      const response = await fetch(`YOUR_API_ENDPOINT/${ingredientName}`);
      const data = await response.json();
      setApiData(data);
    } catch (error) {
      console.error('Error fetching API:', error);
    }
  };

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
    onFavoriteToggle(recipe.id, !isFavorite);
  };

  useEffect(() => {
    console.log(apiData);
  }, [apiData]);

  return (
    <div key={recipe.id} className="recipe-card">
      <h3>{recipe.title}</h3>
      <img src={recipe.image} alt={recipe.title} />

      <div>
        <p>Ingredients:</p>
        {recipe.extendedIngredients.map((ingredient, index) => (
          <button
            key={index}
            className="ingredient-button"
            onClick={() => handleIngredientClick(ingredient.nameClean)}
          >
            {ingredient.nameClean}
          </button>
        ))}
      </div>

      <p>Original Ingredients: {recipe.extendedIngredients.map((ingredient) => ingredient.original).join(', ')}</p>

      <a href={recipe.sourceUrl} target="_blank" rel="noopener noreferrer">
        View Recipe
      </a>

      <button className="fav-button">
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
    </div>
  );
}

export default RecipeCard;
