import { auth } from '../../firebase/firebase';
import { addCurrentUser, clearAllCurrents } from './currentActions';

// action types
const AUTH_ERROR = `AUTH_ERROR`;
const AUTH_SUCCESS = `AUTH_SUCCESS`;
const LOADING_START = `LOADING_START`;

// action creators
export const signUp = (email, password) => {
  return dispatch => {
    dispatch({ type: LOADING_START });
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        dispatch({ type: AUTH_SUCCESS });
        dispatch(addCurrentUser(res.user.uid));
      })
      .catch(err => dispatch({ type: AUTH_ERROR, payload: err }));
  };
};

export const logIn = (email, password) => {
  return dispatch => {
    dispatch({ type: LOADING_START });
    auth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        dispatch({ type: AUTH_SUCCESS });
        dispatch(addCurrentUser(res.user.uid));
      })
      .catch(err => dispatch({ type: AUTH_ERROR, payload: err }));
  };
};

export const signOut = () => {
  return dispatch => {
    auth
      .signOut()
      .then(() => {
        dispatch({ type: AUTH_SUCCESS });
        dispatch(clearAllCurrents());
      })
      .catch(err => dispatch({ type: AUTH_ERROR, payload: err }));
  };
};
