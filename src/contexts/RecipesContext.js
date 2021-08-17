import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const RecipesContext = createContext({});

export function RecipesContextProvider({ children }) {
  const [filter, setFilter] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [category, setCategory] = useState('');
  const [format, setFormat] = useState('');

  useEffect(() => {
    if (filter === 'firstLetter' && searchText.length > 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
    }
  }, [filter, searchText]);

  async function submitSearch(event) {
    event.preventDefault();

    if (filter === 'ingredients') {
      const url = `https://www.the${category}db.com/api/json/v1/1/filter.php?i=${searchText}`;
      const request = await fetch(url);
      const data = await request.json();
      setRecipes(data[format]);
    }
    if (filter === 'name') {
      const url = `https://www.the${category}db.com/api/json/v1/1/search.php?s=${searchText}`;
      const request = await fetch(url);
      const data = await request.json();
      setRecipes(data[format]);
    }
    if (filter === 'firstLetter') {
      const url = `https://www.the${category}db.com/api/json/v1/1/search.php?f=${searchText}`;
      const request = await fetch(url);
      const data = await request.json();
      setRecipes(data[format]);
    }
  }

  return (
    <RecipesContext.Provider
      value={ {
        recipes,
        searchText,
        setFilter,
        setCategory,
        setSearchText,
        submitSearch,
        setFormat,
      } }
    >
      {children}
    </RecipesContext.Provider>
  );
}

RecipesContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export const useRecipes = () => useContext(RecipesContext);
