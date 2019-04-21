import React from 'react';
import { Helmet } from 'react-helmet';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
    margin: 0;
    padding: 0;
    font-size: 20px;
  }
  body {
    width: 100vw;
    height: 100vh;
    background-color: ${props => props.theme.offWhite};
    color: ${props => props.theme.black};
  }
`;

const theme = {
  black: `#272727`,
  blue: `#1b85b8`,
  yellow: `#ffc600`,
  offWhite: `#ededed`,
};

const Layout = ({ children }) => (
  <ThemeProvider theme={theme}>
    <>
      <GlobalStyle />
      <Helmet htmlAttributes={{ lang: `en` }}>
        <meta charSet="utf-8" />
        <meta name="description" content="Trello Clone" />
        <title>Trelfaux</title>
      </Helmet>
      {children}
    </>
  </ThemeProvider>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
