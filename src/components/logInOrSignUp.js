import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';

import AuthForm from './authForm';

import { logIn, signUp } from '../redux/actions/authActions';

const StyledLogInOrSignUp = styled.div`
  display: grid;
  grid-gap: 1rem;
  justify-content: center;
  margin-top: 1rem;
  .tabs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    > * {
      background-color: white;
      font-size: 1.5rem;
      padding: 1rem 2rem;
      border: none;
    }
  }
  .form {
    width: 400px;
  }
  .bottom-border {
    border-bottom: solid 5px ${props => props.theme.yellow};
  }
`;

const LogInOrSignUp = ({ user, auth, handleLogIn, handleSignUp }) => {
  useEffect(() => {
    if (user) navigate(`/`, { replace: true });
  }, [user]);

  const [isLogIn, setIsLogIn] = useState(true);

  return (
    <StyledLogInOrSignUp>
      <div className="tabs">
        <button
          type="button"
          onClick={() => setIsLogIn(true)}
          className={isLogIn ? `bottom-border` : null}>
          Log In
        </button>
        <button
          type="button"
          onClick={() => setIsLogIn(false)}
          className={isLogIn ? null : `bottom-border`}>
          Sign Up
        </button>
      </div>
      <div className="form">
        <AuthForm
          auth={auth}
          onSubmitFunction={isLogIn ? handleLogIn : handleSignUp}
          buttonText={auth.loading ? `Loading...` : isLogIn ? `Log In` : `Sign Up`}
        />
      </div>
    </StyledLogInOrSignUp>
  );
};

LogInOrSignUp.propTypes = {
  user: PropTypes.string.isRequired,
  auth: PropTypes.instanceOf(Object).isRequired,
  handleLogIn: PropTypes.func.isRequired,
  handleSignUp: PropTypes.func.isRequired,
};

const mapState = state => {
  return {
    user: state.current.user,
    auth: state.auth,
  };
};

const mapDispatch = dispatch => {
  return {
    handleLogIn: (email, password) => {
      dispatch(logIn(email, password));
    },
    handleSignUp: (email, password) => {
      dispatch(signUp(email, password));
    },
  };
};

export default connect(
  mapState,
  mapDispatch
)(LogInOrSignUp);
