import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import HeaderWithoutSearch from '../components/HeaderWithoutSearch';

export default function ExplorarComidas() {
  const history = useHistory();

  const getExploreMeal = async () => {
    const endpoint = 'https://www.themealdb.com/api/json/v1/1/random.php';
    const data = await fetch(endpoint);
    const { meals } = await data.json();

    if (meals.length === 1) {
      const btnSurprise = meals[0].idMeal;
      history.push(`/comidas/${btnSurprise}`);
    }
  };

  return (
    <div>
      <HeaderWithoutSearch title="Explorar Comidas" />
      <Link to="/explorar/comidas/ingredientes">
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
      </Link>
      <Link to="/explorar/comidas/area">
        <button
          type="button"
          data-testid="explore-by-area"
        >
          Por Local de Origem
        </button>
      </Link>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ getExploreMeal }
      >
        Me Surpreenda!
      </button>
      <Footer />
    </div>
  );
}
