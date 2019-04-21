import React from 'react';

import Layout from '../components/layout/layout';
import TitleContainer from '../components/layout/titleContainer';
import BoardView from '../components/boardView';

import withProvider from '../redux/withProvider';

const BoardPage = () => (
  <Layout>
    <TitleContainer title="Trelfaux">
      <BoardView />
    </TitleContainer>
  </Layout>
);

export default withProvider(BoardPage);
