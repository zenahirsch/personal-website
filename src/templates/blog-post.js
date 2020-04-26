import { ArrowLeftOutlined, FireTwoTone } from '@ant-design/icons';
import { Divider, Typography } from 'antd';
import { Link, graphql } from 'gatsby';
import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';

const { Title, Text } = Typography;

const BlogPostTemplate = ({ data }) => {
  const post = data.allButterPost.edges[0].node;

  return (
    <Layout>
      <SEO title={post.seo_title} description={post.description} />
      <Text type="secondary">{post.published}</Text>
      <Title level={3}>{post.title}</Title>
      <div dangerouslySetInnerHTML={{ __html: post.body }} />
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
  query BlogPostBySlug($slug: String!) {
    allButterPost(filter: { slug: { eq: $slug } }) {
      edges {
        node {
          id
          body
          title
          seo_title
          published(formatString: "MMMM D, YYYY")
          author {
            first_name
            last_name
          }
        }
      }
    }
  }
`;
