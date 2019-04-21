import firebase, { db } from '../../firebase/firebase';
import { clearCurrentBoard } from './currentActions';

// action types
const SUCCESS = `SUCCESS`;
const ERROR = `ERROR`;

// action creators
export const addBoard = board => {
  return (dispatch, getState) => {
    const state = getState();
    const { user } = state.current;
    db.collection(`boards`)
      .add({
        boardName: board,
        createdBy: user,
        createdAt: new Date(),
      })
      .then(dispatch({ type: SUCCESS }))
      .catch(err => dispatch({ type: ERROR, payload: err }));
  };
};

export const addItem = (id, item) => {
  return dispatch => {
    db.collection(`lists`)
      .doc(id)
      .update({
        items: firebase.firestore.FieldValue.arrayUnion(item),
      })
      .then(dispatch({ type: SUCCESS }))
      .catch(err => dispatch({ type: ERROR, payload: err }));
  };
};

export const addList = name => {
  return (dispatch, getState) => {
    const state = getState();
    const { board } = state.current;
    db.collection(`lists`)
      .add({
        listName: name,
        createdAt: new Date(),
        owningBoardId: board.id,
        items: [],
      })
      .then(dispatch({ type: SUCCESS }))
      .catch(err => dispatch({ type: ERROR, payload: err }));
  };
};

export const deleteBoard = (id, currentBoardId) => {
  return dispatch => {
    if (id === currentBoardId) {
      dispatch(clearCurrentBoard());
    }
    db.collection(`boards`)
      .doc(id)
      .delete()
      .then(dispatch({ type: SUCCESS }))
      .catch(err => dispatch({ type: ERROR, payload: err }));
    db.collection(`lists`)
      .where(`owningBoardId`, `==`, id)
      .get()
      .then(querySnapshot =>
        querySnapshot.forEach(doc => {
          db.collection(`lists`)
            .doc(doc.id)
            .delete()
            .then(() => dispatch({ type: SUCCESS }))
            .catch(err => dispatch({ type: ERROR, payload: err }));
        })
      );
  };
};

export const deleteItem = (id, item) => {
  return dispatch => {
    db.collection(`lists`)
      .doc(id)
      .update({
        items: firebase.firestore.FieldValue.arrayRemove(item),
      })
      .then(dispatch({ type: SUCCESS }))
      .catch(err => dispatch({ type: ERROR, payload: err }));
  };
};

export const deleteList = id => {
  return dispatch => {
    db.collection(`lists`)
      .doc(id)
      .delete()
      .then(dispatch({ type: SUCCESS }))
      .catch(err => dispatch({ type: ERROR, payload: err }));
  };
};
