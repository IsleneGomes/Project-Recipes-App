import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchIngredients } from '../../redux/actions/IngredientsApiAction';

import searchIcon from '../../images/searchIcon.svg';
import profileIcon from '../../images/profileIcon.svg';
import './header.css';

const Header = ({ page, showSearchBtn, dispatch }) => {
  const [showField, setShowField] = useState(false);
  const [typeIngredient, setTypeIngredient] = useState('');
  const [selectedRadio, setSelectedRadio] = useState('');
  console.log(selectedRadio);
  const handleIngredient = ({ target }) => {
    if (selectedRadio === 'ingrediente') {
      setTypeIngredient(target.value);
    }
  };
  const handleRadioButton = () => {
    if (selectedRadio === 'ingrediente') {
      dispatch(fetchIngredients(typeIngredient));
    }
  };
  return (
    <>
      <header className="header-style">
        <Link to="/perfil">
          <img
            src={ profileIcon }
            alt="profile icon"
            data-testid="profile-top-btn"
          />
        </Link>
        <h3 data-testid="page-title">{page}</h3>
        {
          (showSearchBtn)
            ? (
              <button
                type="button"
                onClick={ () => setShowField((show) => !show) }
              >
                <img
                  src={ searchIcon }
                  alt="research magnifying glass"
                  data-testid="search-top-btn"
                />
              </button>) : null
        }
      </header>
      <span className="field-style">
        <label htmlFor="radio-buttons-label">
          <label htmlFor="label-ingredient-radio">
            Ingrediente
            <input
              type="radio"
              data-testid="ingredient-search-radio"
              name="ingredient"
              value="ingrediente"
              onClick={ ({ target: { value } }) => setSelectedRadio(value) }
            />
          </label>

          <label htmlFor="label-name-radio">
            Nome
            <input
              type="radio"
              data-testid="name-search-radio"
              name="ingredient"
              value="name"
            />
          </label>

          <label htmlFor="label-first-letter-radio">
            Primeira letra
            <input
              type="radio"
              data-testid="first-letter-search-radio"
              name="ingredient"
              value="first-letter"
            />
          </label>
          <button
            type="button"
            data-testid="exec-search-btn"
            onClick={ () => handleRadioButton() }
          >
            Buscar
          </button>
        </label>
        {
          showField
            ? (
              <input
                type="text"
                data-testid="search-input"
                onChange={ handleIngredient }
              />
            )
            : null
        }
      </span>
    </>
  );
};

Header.propTypes = ({
  page: PropTypes.string,
  showSearchBtn: PropTypes.bool,
  dispatch: PropTypes.object,
}).isRequired;

export default connect()(Header);
