import React from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../../images/profileIcon.svg';
import '../../css/Headers.css';

function HeaderRecipesDone() {
  return (
    <header
      className="header-RecipesDone"
    >
      <Link to="/perfil">
        <button
          type="button"
        >
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="user profile"
            width="30px"
            height="30px"
          />
        </button>
      </Link>
      <h1 data-testid="page-title">Receitas Feitas</h1>
    </header>
  );
}

export default HeaderRecipesDone;
