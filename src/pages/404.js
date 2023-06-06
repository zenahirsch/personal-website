import { Typography } from 'antd';
import React from 'react';

import Layout from '../components/layout';
import Seo from '../components/seo';

const { Title, Paragraph } = Typography;

const NotFoundPage = () => (
  <Layout>
    <Seo title="404: Not found" />
    <Title>Umm... what?</Title>
    <Paragraph>
      This page doesn't exist. Your guess is as good as mine!
    </Paragraph>
  </Layout>
);

export default NotFoundPage;
