const authInitialState = {
  loading: false,
  error: false,
  message: ``,
};

const authReducer = (state = authInitialState, { type, payload }) => {
  switch (type) {
    case `AUTH_ERROR`:
      return Object.assign({}, state, {
        error: true,
        message: payload.message,
        loading: false,
      });
    case `AUTH_SUCCESS`:
      return Object.assign({}, state, { ...authInitialState });
    case `LOADING_START`:
      return Object.assign({}, state, { loading: true });
    default:
      return state;
  }
};

export default authReducer;
