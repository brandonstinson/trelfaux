import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import useFormInput from '../hooks/useFormInput';

const StyledAddItem = styled.div`
  form {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
    align-items: center;
    input {
      width: 300px;
      font-size: 1rem;
      padding: 0.5rem;
    }
  }
  button {
    padding: 0.5rem 1rem;
    border-radius: 5px;
    background: white;
  }
  @media (min-width: 700px) {
    form {
      grid-template-columns: 1fr auto;
    }
  }
`;

const AddItem = ({ typeText, onClickFunction }) => {
  const [name, onNameChange, clearNameInput] = useFormInput();

  const submit = e => {
    e.preventDefault();
    onClickFunction(name);
    clearNameInput();
  };

  return (
    <StyledAddItem>
      <form onSubmit={submit}>
        <label htmlFor="boardName">
          <input
            type="text"
            id="boardName"
            placeholder={`${typeText} Name`}
            value={name}
            onChange={onNameChange}
            required
          />
        </label>
        <button type="submit">{`Add ${typeText}`}</button>
      </form>
    </StyledAddItem>
  );
};

AddItem.propTypes = {
  typeText: PropTypes.string.isRequired,
  onClickFunction: PropTypes.func.isRequired,
};

export default AddItem;
