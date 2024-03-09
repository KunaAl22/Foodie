# Foodie
Overview

Foodie is a web application that allows users to search for recipes based on ingredients or keywords. It leverages the Spoonacular API to fetch recipe data and provides a user-friendly interface for exploring and discovering new recipes.
Features

    Ingredient-based Search: Users can search for recipes based on the ingredients they have or want to use.

    Dynamic Loading: Recipes are dynamically loaded as the user scrolls, providing a seamless browsing experience.

    Detailed Information: Each recipe card displays detailed information about the recipe, including title, image, ingredients, and a link to view the complete recipe.

Usage

    Search for Recipes:
        Enter ingredients or keywords in the search bar.
        Click the "Add Ingredient" button to include the ingredient in your search.
        
    Explore Recipes:
        Scroll through the results to discover various recipes.
        Click on a recipe card to view detailed information and find a link to the full recipe.

    Manage Ingredients:
        Remove ingredients by clicking the "X" button next to each applied ingredient.

Getting Started

To run the Recipe Search App locally, follow these steps:

    Clone the repository:

    bash

git clone https://github.com/KunaAl22/Foodie.git
cd foodie

Install dependencies:

bash

npm install

Obtain API Key:

    Get a Spoonacular API key from Spoonacular API.

Configure API Key:

    Replace 'ApiKey' with your Spoonacular API key in src/App.js.

Run the application:

bash

    npm start

    Open the app in your browser at http://localhost:3000.

Technologies Used

    React
    Axios
    Spoonacular API

Credits

This project utilizes the Spoonacular API for recipe data. Special thanks to the Spoonacular team for providing this resource.
