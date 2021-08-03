import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Cards extends Component {
  render() {
    const { foodCardsList } = this.props;
    console.log(foodCardsList);
    return (
      <ul>
        { foodCardsList.map((item, index) => (
          <li key={ item.idMeal } data-testid={ `${index}-recipe-card` }>
            <Link to={ `/comidas/${item.idMeal}` }>
              <img
                height="200px"
                width="200px"
                data-testid={ `${index}-card-img` }
                src={ item.strMealThumb }
                alt="Imagem da receita pronta"
              />
              <h3 data-testid={ `${index}-card-name` }>{ item.strMeal }</h3>
            </Link>
          </li>
        ))}
      </ul>
    );
  }
}

const mapStateToProps = (state) => ({
  foodCardsList: state.foodReducers.foodCardsList,
});

Cards.propTypes = {
  foodCardsList: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps, null)(Cards);
