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
        dataSource={posts}
        renderItem={(post) => (
          <List.Item
            key={post.node.id}
            extra={post.node.published}
            actions={[<Link to={`/blog/${post.node.slug}`}>Read more</Link>]}
          >
            <List.Item.Meta
              title={
                <Link to={`/blog/${post.node.slug}`}>{post.node.title}</Link>
              }
              description={post.node.summary}
            />
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
