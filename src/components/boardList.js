import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';

import Menu from './menu';
import AddItem from './addItem';
import BoardCard from './boardCard';

import { db } from '../firebase/firebase';
import { addBoard } from '../redux/actions/boardActions';

const StyledBoardList = styled.div`
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
  .boards {
    display: grid;
    grid-template-columns: repeat(auto-fill, 300px);
    grid-gap: 1rem;
    justify-content: center;
    justify-self: stretch;
  }
`;

const BoardList = ({ user, handleAddBoard }) => {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    if (!user) navigate(`/auth`, { replace: true });
    let boardsFromDB = [];
    const unsubscribe = db
      .collection(`boards`)
      .where(`createdBy`, `==`, user)
      .orderBy(`createdAt`)
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === `added`) {
            const newBoardObject = { ...change.doc.data(), id: change.doc.id };
            boardsFromDB = [...boardsFromDB, newBoardObject];
          } else if (change.type === `removed`) {
            boardsFromDB = boardsFromDB.filter(item => item.id !== change.doc.id);
          }
        });
        setBoards(boardsFromDB);
      });
    return () => unsubscribe();
  }, [user]);

  return (
    <StyledBoardList>
      <Menu location="Boards" left="text" leftText={`${boards.length || `0`} boards`} />
      <AddItem typeText="Board" onClickFunction={handleAddBoard} />
      <hr />
      <div className="boards">
        {boards.length ? boards.map((item, index) => <BoardCard key={index} board={item} />) : null}
      </div>
    </StyledBoardList>
  );
};

BoardList.propTypes = {
  user: PropTypes.string.isRequired,
  handleAddBoard: PropTypes.func.isRequired,
};

const mapState = state => {
  return {
    user: state.current.user,
  };
};

const mapDispatch = dispatch => {
  return {
    handleAddBoard: name => {
      dispatch(addBoard(name));
    },
  };
};

export default connect(
  mapState,
  mapDispatch
)(BoardList);
