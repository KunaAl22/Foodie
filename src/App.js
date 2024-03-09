import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
// require('dotenv').config();

import RecipeCard from './components/RecipeCard';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [appliedIngredients, setAppliedIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const cuisines = ['European', 'Indian', 'Irish', 'Italian', 'Japanese', 'Spanish', 'Thai'];
  const mealTypes = ['main course', 'dessert', 'salad', 'breakfast', 'soup', 'beverage', 'snack'];
  const [selectedCuisine, setSelectedCuisine] = useState(null);
  const [selectedMealType, setSelectedMealType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 10;

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    setRecipes([]); 
    setLoading(true);

    const apiKey = "334231848549453f9160383efd0bb4a2";
    console.log(apiKey);
    // console.log(process.env.apiKey);

    const apiUrl = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${appliedIngredients.join(',')}&number=10`;

    axios
      .get(apiUrl)
      .then(async (response) => {
        const recipesData = response.data;
        const detailedRecipesPromises = recipesData.map((recipe) => fetchRecipeInformation(recipe.id));
        const detailedRecipesData = await Promise.all(detailedRecipesPromises);
        const detailedRecipes = detailedRecipesData.map((response) => response.data);
        setRecipes(detailedRecipes);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert(`Error: ${error.message}`);
      });
  };

  const handleCuisineFilter = (selectedCuisine) => {
    setRecipes([]);
    setLoading(true);

    const apiKey = "334231848549453f9160383efd0bb4a2";
    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&cuisine=${selectedCuisine}&includeIngredients=${appliedIngredients.join(',')}&number=10`;

    axios
      .get(apiUrl)
      .then(async (response) => {
        const recipesData = response.data.results;
        const detailedRecipesPromises = recipesData.map((recipe) => fetchRecipeInformation(recipe.id));
        const detailedRecipesData = await Promise.all(detailedRecipesPromises);
        const detailedRecipes = detailedRecipesData.map((response) => response.data);
        setRecipes(detailedRecipes);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert(`Error: ${error.message}`);
      });
  };

  const handleMealTypeFilter = (selectedMealType) => {
    setRecipes([]);
    setLoading(true);

    const apiKey = "334231848549453f9160383efd0bb4a2";
    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&includeIngredients=${appliedIngredients.join(',')}&type=${selectedMealType}&number=10`;

    axios
      .get(apiUrl)
      .then(async (response) => {
        const recipesData = response.data.results;
        const detailedRecipesPromises = recipesData.map((recipe) => fetchRecipeInformation(recipe.id));
        const detailedRecipesData = await Promise.all(detailedRecipesPromises);
        const detailedRecipes = detailedRecipesData.map((response) => response.data);
        setRecipes(detailedRecipes);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert(`Error: ${error.message}`);
      });
  };

  const fetchRecipeInformation = (recipeId) => {
    const apiKey = '334231848549453f9160383efd0bb4a2';
    const apiUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}&includeNutrition=false`;
    return axios.get(apiUrl);
  };

  const addIngredient = () => {
    if (searchTerm.trim() === '') {
      alert('Please enter an ingredient');
      return;
    }

    setAppliedIngredients((prevIngredients) => [...prevIngredients, searchTerm]);
    setSearchTerm('');
  };

  const removeIngredient = (ingredientToRemove) => {
    setAppliedIngredients((prevIngredients) => prevIngredients.filter((ingredient) => ingredient !== ingredientToRemove));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const totalPages = Math.ceil(recipes.length / recipesPerPage);

    if (totalPages <= 1) {
      return null;
    }

    return (
      <div className="pagination">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    );
  };

  useEffect(() => {
    handleSearch();
  }, [appliedIngredients, currentPage]); 

  return (
    <div className="App">
      <div className="logo-container">
      <h1 className="logo">Foodie</h1>

        <div className="search-container">
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Enter ingredients or keywords"
          />
          <button onClick={addIngredient}>Add Ingredient</button>
        </div>
        <div className="applied-ingredients">
          {appliedIngredients.map((ingredient, index) => (
            <div key={index} className="applied-ingredient">
              {ingredient}
              <button onClick={() => removeIngredient(ingredient)}>X</button>
            </div>
          ))}
        </div>

        <div className="cuisine-buttons">
          <div>
            <h4 className='txt'>Cuisine type</h4>
            {cuisines.map((cuisine) => (
              <button
                key={cuisine}
                className={`buttonfilter ${selectedCuisine === cuisine ? 'active' : ''}`}
                onClick={() => {
                  setSelectedCuisine(cuisine);
                  handleCuisineFilter(cuisine);
                }}
              >
                {cuisine}
              </button>
            ))}
          </div>
        </div>

        <div className="meal-type-buttons">
          <div>
            <h4 className='txt'>Meal type</h4>
            {mealTypes.map((mealType) => (
              <button
                key={mealType}
                className={`buttonfilter ${selectedMealType === mealType ? 'active' : ''}`}
                onClick={() => {
                  setSelectedMealType(mealType);
                  handleMealTypeFilter(mealType);
                }}
              >
                {mealType}
              </button>
            ))}
          </div>
        </div>

        <div className="results-container">
          {loading && <p>Loading...</p>}
          {recipes
            .slice((currentPage - 1) * recipesPerPage, currentPage * recipesPerPage)
            .map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          {renderPagination()}
        </div>
      </div>
    </div>
  );
}

export default App;
