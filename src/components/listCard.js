import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ItemCard from './itemCard';

import { deleteList, addItem } from '../redux/actions/boardActions';
import useFormInput from '../hooks/useFormInput';

const StyledListCard = styled.div`
  display: grid;
  grid-gap: 0.5rem;
  align-content: start;
  padding: 1rem;
  background-color: white;
  border: none;
  border-radius: 5px;
  box-shadow: 5px 5px 5px gray;
  hr {
    border: 0;
    height: 3px;
    background: #ccc;
    background-image: linear-gradient(to right, #ccc, #333, #ccc);
    justify-self: stretch;
  }
  form {
    display: grid;
    grid-gap: 0.5rem;
    input {
      width: 260px;
      font-size: 1rem;
      padding: 0.5rem;
    }
  }
  .title {
    text-align: center;
    font-size: 1.5rem;
  }
`;

const ListCard = ({ list: { listName, items, id }, handleDeleteList, handleAddItem }) => {
  const [newItem, onNewItemChange, clearNewItemInput] = useFormInput();

  const submit = e => {
    e.preventDefault();
    clearNewItemInput();
    handleAddItem(id, newItem);
  };

  return (
    <StyledListCard>
      <div className="title">{listName}</div>
      <hr />
      {items.length
        ? items.map((item, index) => <ItemCard key={index} item={item} listId={id} />)
        : null}
      <form onSubmit={submit}>
        <label htmlFor="add-list-input">
          <input
            type="text"
            id="add-list-input"
            value={newItem}
            onChange={onNewItemChange}
            placeholder="Item"
          />
        </label>
        <button type="submit">Add Item</button>
      </form>
      <hr />
      <button type="button" onClick={() => handleDeleteList(id)}>
        Delete List
      </button>
    </StyledListCard>
  );
};

ListCard.propTypes = {
  list: PropTypes.instanceOf(Object).isRequired,
  handleDeleteList: PropTypes.func.isRequired,
  handleAddItem: PropTypes.func.isRequired,
};

const mapDispatch = dispatch => {
  return {
    handleDeleteList: id => {
      dispatch(deleteList(id));
    },
    handleAddItem: (id, item) => {
      dispatch(addItem(id, item));
    },
  };
};

export default connect(
  null,
  mapDispatch
)(ListCard);
