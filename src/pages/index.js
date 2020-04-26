import { graphql } from 'gatsby';
import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';

const IndexPage = ({ data }) => {
  const { body } = data.butterPage;

  return (
    <Layout>
      <SEO title="Home" />
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  {
    butterPage(slug: { eq: "index" }) {
      body
    }
  }
`;
