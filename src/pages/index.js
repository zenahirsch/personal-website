import { Typography } from 'antd';
import { graphql } from 'gatsby';
import React from 'react';
import Layout from '../components/layout';
import Seo from '../components/seo';

const { Title } = Typography;

const IndexPage = ({ data }) => {
  const { markdownRemark } = data;
  const { frontmatter: { title }, html } = markdownRemark;

  return (
    <Layout>
      <Seo title={title} />
      <Title level={3}>{title}</Title>
      <div className="home-content" dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query {
    markdownRemark(frontmatter: { path: { eq: "/" } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
