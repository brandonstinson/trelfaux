import React from 'react';

import Layout from '../components/layout/layout';
import TitleContainer from '../components/layout/titleContainer';
import BoardList from '../components/boardList';

import withProvider from '../redux/withProvider';

const BoardListPage = () => (
  <Layout>
    <TitleContainer title="Trelfaux">
      <BoardList />
    </TitleContainer>
  </Layout>
);

export default withProvider(BoardListPage);
