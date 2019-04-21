const currentInitialState = {
  user: ``,
  board: {},
};

const currentReducer = (state = currentInitialState, { type, payload }) => {
  switch (type) {
    case `ADD_CURRENT_BOARD`:
      return Object.assign({}, state, { board: payload });
    case `ADD_CURRENT_USER`:
      return Object.assign({}, state, { user: payload });
    case `CLEAR_CURRENT_BOARD`:
      return Object.assign({}, state, { board: {} });
    case `CLEAR_CURRENT_USER`:
      return Object.assign({}, state, { user: `` });
    default:
      return state;
  }
};

export default currentReducer;
