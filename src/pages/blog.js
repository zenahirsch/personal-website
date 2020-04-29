import { List } from 'antd';
import { Link, graphql } from 'gatsby';
import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';

const BlogIndex = ({ data }) => {
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout>
      <SEO title="Blog" />
      <List
        itemLayout="vertical"
        dataSource={posts}
        renderItem={(post) => (
          <List.Item
            key={post.node.id}
            extra={post.node.frontmatter.date}
            actions={[<Link to={post.node.frontmatter.path}>Read more</Link>]}
          >
            <List.Item.Meta
              title={
                <Link to={post.node.frontmatter.path}>{post.node.frontmatter.title}</Link>
              }
              description={post.node.frontmatter.summary}
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
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/(posts)/" } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
            summary
          }
        }
      }
    }
  }
`;