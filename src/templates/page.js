import { Typography } from 'antd';
import { graphql } from 'gatsby';
import React from 'react';

import Layout from '../components/layout';
import Seo from '../components/seo';

const { Title } = Typography;

const PageTemplate = ({ data }) => {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;

  return (
    <Layout>
      <Seo title={frontmatter.title} />
      <Title level={3}>{frontmatter.title}</Title>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  );
};

export default PageTemplate;

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
      }
    }
  }
`;
