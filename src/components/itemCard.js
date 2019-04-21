import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { deleteItem } from '../redux/actions/boardActions';

const StyledItemCard = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  padding: 0.5rem;
  background-color: #c0c5ce;
  border: none;
  border-radius: 5px;
  button.delete {
    background: #c0c5ce;
    color: red;
    padding: 0.25rem;
    border: none;
  }
`;

const ItemCard = ({ item, listId, handleDeleteItem }) => {
  return (
    <StyledItemCard>
      <div className="item">{item}</div>
      <button type="button" onClick={() => handleDeleteItem(listId, item)} className="delete">
        ️X
      </button>
    </StyledItemCard>
  );
};

ItemCard.propTypes = {
  item: PropTypes.string.isRequired,
  listId: PropTypes.string.isRequired,
  handleDeleteItem: PropTypes.func.isRequired,
};

const mapDispatch = dispatch => {
  return {
    handleDeleteItem: (id, item) => {
      dispatch(deleteItem(id, item));
    },
  };
};

export default connect(
  null,
  mapDispatch
)(ItemCard);
