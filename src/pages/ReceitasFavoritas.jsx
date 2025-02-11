import React, { useState, useEffect } from 'react';
import HeaderWithoutSearch from '../components/HeaderWithoutSearch';
import FavRecipeCard from '../components/FavRecipeCard';

export default function ReceitasFavoritas() {
  const [favRecipes, setFavRecipes] = useState([]);

  function getFavRecipes() {
    const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavRecipes(recipes);
  }

  function filterByFood() {
    const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const favFood = recipes.filter((recipe) => recipe.type === 'comida');
    setFavRecipes(favFood);
  }

  function filterByDrink() {
    const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const favDrink = recipes.filter((recipe) => recipe.type === 'bebida');
    setFavRecipes(favDrink);
  }

  function removeFavorite(id) {
    const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavRecipes = recipes.filter((recipe) => recipe.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavRecipes));
    setFavRecipes(newFavRecipes);
  }

  useEffect(() => {
    getFavRecipes();
  }, []);

  return (
    <div className="favorite-recipes">
      <HeaderWithoutSearch title="Receitas Favoritas" />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ getFavRecipes }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ filterByFood }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ filterByDrink }
      >
        Drink
      </button>
      { favRecipes && favRecipes.map((recipe, index) => (
        <FavRecipeCard
          key={ index }
          index={ index }
          recipe={ recipe }
          removeFavorite={ removeFavorite }
        />
      )) }
    </div>
  );
}
