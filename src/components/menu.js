import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { signOut } from '../redux/actions/authActions';

const StyledMenu = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas:
    'location location'
    'let logout';
  grid-gap: 1rem;
  justify-self: stretch;
  justify-items: center;
  align-items: center;
  button {
    font-size: 0.8rem;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    background: white;
  }
  .location {
    font-size: 1.5rem;
    grid-area: location;
  }
  @media (min-width: 600px) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-areas: 'left location logout';
    button {
      font-size: 1rem;
      padding: 1rem 2rem;
    }
    .location {
      font-size: 2rem;
    }
  }
`;

const Menu = ({ left, leftText, leftFunction, location, handleSignOut }) => (
  <StyledMenu>
    <div className="left">
      {left === `button` && (
        <button type="button" onClick={leftFunction}>
          {leftText}
        </button>
      )}
      {left === `text` && <div>{leftText}</div>}
    </div>
    <div className="location">{location}</div>
    <button onClick={handleSignOut} type="button" className="logout">
      Log Out
    </button>
  </StyledMenu>
);

Menu.propTypes = {
  left: PropTypes.string.isRequired,
  leftText: PropTypes.string.isRequired,
  leftFunction: PropTypes.func,
  location: PropTypes.string.isRequired,
  handleSignOut: PropTypes.func.isRequired,
};

const mapDispatch = dispatch => {
  return {
    handleSignOut: () => {
      dispatch(signOut());
    },
  };
};

export default connect(
  null,
  mapDispatch
)(Menu);
