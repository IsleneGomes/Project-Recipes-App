import React from 'react';
import { useHistory } from 'react-router';
import propTypes from 'prop-types';
import { Button } from 'react-bootstrap';

export default function TravelButtons(props) {
  const { children } = props;
  const history = useHistory();
  const travel = () => (
    <div className="d-flex justify-content-between">
      <button
        className="travelButton"
        type="button"
        onClick={ () => history.goBack() }
      >
        <i className="fas fa-arrow-circle-left" />
      </button>
      {/* <Button
        type="button"
        variant="outline-dark"
        onClick={ () => history.goForward() }
      >
        <i className="fas fa-arrow-circle-right" />
      </Button> */}
    </div>);

  return (
    <div>
      { travel() }
      {children}
    </div>);
}

TravelButtons.propTypes = {
  children: propTypes.node.isRequired,
};
