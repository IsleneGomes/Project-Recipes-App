import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import MyContext from '../context/MyContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

export default function ProgressFoodRecipe(props) {
  const [data, setData] = useState([]);
  const { history } = props;
  const { location } = history;
  const { pathname } = location;
  const id = pathname.split('/')[2];

  useEffect(() => {
    async function fetchFoodsById() {
      const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(endpoint);
      const json = await response.json();
      setData(json);
    }
    fetchFoodsById();
  }, [id]);

  const ingredientes = (data.length === 0) ? ''
    : Object.keys(data.meals[0])
      .filter((ingredient) => ingredient.includes('strIngredient'))
      .map((element) => data.meals[0][element])
      .filter((value) => value);

  function handleClickCheckbox({ target }) {
    const { checked } = target;
    if (checked) {
      target.parentNode.style.textDecoration = 'line-through';
    } else {
      target.parentNode.style.textDecoration = 'none';
    }
  }

  return (
    <div>
      <h1>Progresso Comida</h1>
      {data.length === 0 ? <p>Loading...</p> : (
        <>
          <img
            data-testid="recipe-photo"
            src={ data.meals[0].strMealThumb }
            alt="foto da comida"
          />
          <h2 data-testid="recipe-title">{data.meals[0].strMeal}</h2>
          <button
            type="button"
            data-testid="share-btn"
          >
            <img src={ shareIcon } alt="compartilhar" />
          </button>
          <button
            type="button"
            data-testid="favorite-btn"
          >
            <img src={ whiteHeartIcon } alt="favoritar" />
          </button>
          <p data-testid="recipe-category">
            {' '}
            {data.meals[0].strCategory}
          </p>
          <p>Ingredientes</p>
          {ingredientes.map((item, index) => (
            <div key={ index } data-testid={ `${index}-ingredient-step` }>
              <label
                htmlFor={ `${index}-ingredient-step` }
              >
                <input
                  type="checkbox"
                  id={ `${index}-ingredient-step` }
                  onClick={ handleClickCheckbox }
                />
                {' '}
                { item }
              </label>
              <br />
            </div>
          ))}
          <br />
          <p data-testid="instructions">
            {' '}
            Instruções:
            <br />
            {data.meals[0].strInstructions}
          </p>
          <button
            type="button"
            data-testid="finish-recipe-btn"
          >
            Finalizar Receita
          </button>
        </>
      )}
    </div>
  );
}

ProgressFoodRecipe.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.shape({
        split: PropTypes.func,
      }),
    }),
  }),
}.isRequired;

ProgressFoodRecipe.contextType = MyContext;
