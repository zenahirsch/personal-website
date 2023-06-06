import { List, Typography } from 'antd';
import { Link, graphql } from 'gatsby';
import React from 'react';

import Layout from '../components/layout';
import Seo from '../components/seo';

const { Paragraph } = Typography;

const BlogIndex = ({ data }) => {
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout>
      <Seo title="Blog" />
      <List
        itemLayout="vertical"
        dataSource={posts}
        renderItem={(post) => (
          <List.Item
            key={post.node.id}
            actions={[
              <Paragraph>{post.node.frontmatter.date}</Paragraph>,
              <Link to={`/blog/${post.node.frontmatter.slug}`}>Read more</Link>,
            ]}
          >
            <List.Item.Meta
              title={
                <Link to={`/blog/${post.node.frontmatter.slug}`}>
                  {post.node.frontmatter.title}
                </Link>
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
      filter: {
        fileAbsolutePath: {
          regex: "/(posts)/"
        }
        frontmatter: {
          published: { eq: true }
        }
      }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          id
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            slug
            title
            summary
          }
        }
      }
    }
  }
`;
