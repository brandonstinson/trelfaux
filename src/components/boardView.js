import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';

import Menu from './menu';
import AddItem from './addItem';
import ListCard from './listCard';

import { db } from '../firebase/firebase';
import { addList } from '../redux/actions/boardActions';

const StyledBoardView = styled.div`
  display: grid;
  justify-items: center;
  grid-gap: 1rem;
  button {
    padding: 0.5rem 1rem;
    border-radius: 5px;
    background: white;
  }
  hr {
    border: 0;
    height: 3px;
    background: #ccc;
    background-image: linear-gradient(to right, #ccc, #333, #ccc);
    justify-self: stretch;
  }
  .lists {
    display: grid;
    grid-template-columns: repeat(auto-fill, 300px);
    grid-gap: 1rem;
    justify-content: center;
    justify-self: stretch;
  }
`;

const BoardView = ({ board, handleAddList }) => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    if (!board.id) return navigate(`/`, { replace: true });
    let listsfromDB = [];
    const unsubscribe = db
      .collection(`lists`)
      .where(`owningBoardId`, `==`, board.id)
      .orderBy(`createdAt`)
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === `added`) {
            const newListObject = { ...change.doc.data(), id: change.doc.id };
            listsfromDB = [...listsfromDB, newListObject];
          } else if (change.type === `removed`) {
            listsfromDB = listsfromDB.filter(item => item.id !== change.doc.id);
          } else if (change.type === `modified`) {
            listsfromDB = [
              ...listsfromDB.slice(0, change.oldIndex),
              { ...change.doc.data(), id: change.doc.id },
              ...listsfromDB.slice(change.oldIndex + 1),
            ];
          }
        });
        setLists(listsfromDB);
      });
    return () => unsubscribe();
  }, [board]);

  return (
    <StyledBoardView>
      <Menu
        left="button"
        leftText="◀️ Boards"
        leftFunction={() => navigate(`/`)}
        location={board.boardName || `A Board`}
      />
      <AddItem typeText="List" onClickFunction={handleAddList} />
      <hr />
      <div className="lists">
        {lists.length ? lists.map((list, index) => <ListCard key={index} list={list} />) : null}
      </div>
    </StyledBoardView>
  );
};

BoardView.propTypes = {
  board: PropTypes.instanceOf(Object).isRequired,
  handleAddList: PropTypes.func.isRequired,
};

const mapState = state => {
  return {
    board: state.current.board,
  };
};

const mapDispatch = dispatch => {
  return {
    handleAddList: name => {
      dispatch(addList(name));
    },
  };
};

export default connect(
  mapState,
  mapDispatch
)(BoardView);
