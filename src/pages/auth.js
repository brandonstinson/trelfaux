import React from 'react';

import Layout from '../components/layout/layout';
import TitleContainer from '../components/layout/titleContainer';
import LogInOrSignUp from '../components/logInOrSignUp';

import withProvider from '../redux/withProvider';

const AuthPage = () => (
  <Layout>
    <TitleContainer title="Trelfaux">
      <LogInOrSignUp />
    </TitleContainer>
  </Layout>
);

export default withProvider(AuthPage);
