import { ArrowLeftOutlined, FireTwoTone } from '@ant-design/icons';
import { Divider, Typography } from 'antd';
import { Link, graphql } from 'gatsby';
import React from 'react';

import Layout from '../components/layout';
import Seo from '../components/seo';

const { Title, Text } = Typography;

const BlogPostTemplate = ({ data }) => {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;

  return (
    <Layout>
      <Seo title={frontmatter.title} description={frontmatter.summary} />
      <Text type="secondary">{frontmatter.date}</Text>
      <Title level={3}>{frontmatter.title}</Title>
      <div className="blog-content" dangerouslySetInnerHTML={{ __html: html }} />
      <Divider>
        <FireTwoTone twoToneColor="#ffd591" />
      </Divider>
      <Link to="/blog">
        <ArrowLeftOutlined /> Back
      </Link>
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        summary
      }
    }
  }
`;
