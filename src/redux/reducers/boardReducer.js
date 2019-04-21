const boardInitialState = {
  error: false,
  message: ``,
};

const boardReducer = (state = boardInitialState, { type, payload }) => {
  switch (type) {
    case `SUCCESS`:
      return Object.assign({}, state, { ...boardInitialState });
    case `ERROR`:
      return Object.assign({}, state, { error: true, message: payload });
    default:
      return state;
  }
};

export default boardReducer;
