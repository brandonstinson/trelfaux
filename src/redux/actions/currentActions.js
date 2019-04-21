// action types
const ADD_CURRENT_BOARD = `ADD_CURRENT_BOARD`;
const ADD_CURRENT_USER = `ADD_CURRENT_USER`;
const CLEAR_CURRENT_BOARD = `CLEAR_CURRENT_BOARD`;
const CLEAR_CURRENT_USER = `CLEAR_CURRENT_USER`;

// action creators
export const addCurrentBoard = board => {
  return dispatch => {
    dispatch({ type: ADD_CURRENT_BOARD, payload: board });
  };
};

export const addCurrentUser = id => {
  return dispatch => {
    dispatch({ type: ADD_CURRENT_USER, payload: id });
  };
};

export const clearCurrentBoard = () => {
  return dispatch => {
    dispatch({ type: CLEAR_CURRENT_BOARD });
  };
};

export const clearCurrentUser = () => {
  return dispatch => {
    dispatch({ type: CLEAR_CURRENT_USER });
  };
};

export const clearAllCurrents = () => {
  return dispatch => {
    dispatch(clearCurrentBoard());
    dispatch(clearCurrentUser());
  };
};
