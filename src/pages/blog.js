import { List } from 'antd';
import { Link, graphql } from 'gatsby';
import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';

const BlogIndex = ({ data }) => {
  const posts = data.allButterPost.edges;

  return (
    <Layout>
      <SEO title="Blog" />
      <List
        itemLayout="vertical"
        size="large"
        bordered
        dataSource={posts}
        renderItem={(post) => (
          <List.Item key={post.node.id}>
            <List.Item.Meta
              title={
                <Link to={`/blog/${post.node.slug}`}>{post.node.title}</Link>
              }
              description={`Published on ${post.node.published}`}
            />
            {post.node.summary}
          </List.Item>
        )}
      />
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query {
    allButterPost(sort: { fields: published, order: DESC }) {
      edges {
        node {
          id
          title
          slug
          body
          summary
          published(formatString: "MMMM D, YYYY")
        }
      }
    }
  }
`;
