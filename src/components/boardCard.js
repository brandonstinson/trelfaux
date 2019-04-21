import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';

import { deleteBoard } from '../redux/actions/boardActions';
import { addCurrentBoard } from '../redux/actions/currentActions';

const StyledBoardCard = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr auto;
  grid-gap: 1rem;
  justify-items: center;
  border: none;
  border-radius: 5px;
  background-color: white;
  box-shadow: 5px 5px 5px gray;
  padding: 1rem;
  .name {
    grid-column: 1 / -1;
    font-size: 1.5rem;
    text-align: center;
  }
  .open,
  .delete {
    padding: 0.5rem;
    font-size: 0.75rem;
  }
`;

const BoardCard = ({ board, currentBoard, handleAddCurrentBoard, handleDeleteBoard }) => (
  <StyledBoardCard>
    <div className="name">{board.boardName}</div>
    <button type="button" onClick={() => handleAddCurrentBoard(board)} className="open">
      Open Board
    </button>
    <button
      type="button"
      onClick={() => handleDeleteBoard(board.id, currentBoard.id)}
      className="delete">
      Delete Board
    </button>
  </StyledBoardCard>
);

BoardCard.propTypes = {
  board: PropTypes.instanceOf(Object).isRequired,
  currentBoard: PropTypes.instanceOf(Object),
  handleAddCurrentBoard: PropTypes.func.isRequired,
  handleDeleteBoard: PropTypes.func.isRequired,
};

const mapState = state => {
  return {
    currentBoard: state.current.board,
  };
};

const mapDispatch = dispatch => {
  return {
    handleAddCurrentBoard: board => {
      dispatch(addCurrentBoard(board));
      navigate(`/board`);
    },
    handleDeleteBoard: (id, currentBoardId) => {
      dispatch(deleteBoard(id, currentBoardId));
    },
  };
};

export default connect(
  mapState,
  mapDispatch
)(BoardCard);
