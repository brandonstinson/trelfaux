import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledTitle = styled.div`
  display: grid;
  justify-content: center;
  h1 {
    font-size: 2rem;
    padding: 1rem 0 0.5rem;
  }
  @media (min-width: 1000px) {
    h1 {
      font-size: 2.5rem;
    }
  }
  @media (min-width: 1400px) {
    h1 {
      font-size: 3rem;
    }
  }
`;

const StyledContentContainer = styled.div`
  padding: 0 2rem 2rem;
`;

const TitleContainer = ({ title, children }) => (
  <>
    <StyledTitle>
      <h1>{title}</h1>
    </StyledTitle>
    <StyledContentContainer>{children}</StyledContentContainer>
  </>
);

TitleContainer.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default TitleContainer;
