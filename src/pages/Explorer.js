import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';

export default function Explorer() {
  const dispatch = useDispatch();
  const history = useHistory();

  function explorerOnClickBtn(e) {
    dispatch({
      type: 'MODIFY_SEARCH_TRIGGER',
      payload: e.target.id,
    });
    history.push(`/explorar/${e.target.name}`);
  }

  return (
    <main>
      <Header title="Explorar" haveSearchBtn={ false } />
      <button
        name="comidas"
        id="themealdb"
        type="button"
        onClick={ (e) => explorerOnClickBtn(e) }
      >
        Explorar Comidas
      </button>
      <button
        name="bebidas"
        id="thecocktaildb"
        type="button"
        onClick={ (e) => explorerOnClickBtn(e) }
      >
        Explorar Bebidas
      </button>
    </main>
  );
}
