import { Typography } from 'antd';
import { Link } from 'gatsby';
import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';

const { Paragraph } = Typography;

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Paragraph>
      Hi, my name is Zena. I like to code, write, and learn new things. You can
      check out some of my projects on this site. Feel free to{' '}
      <Link to="/contact">get in touch</Link> if you'd like to chat!
    </Paragraph>
  </Layout>
);

export default IndexPage;
