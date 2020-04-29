import { List } from 'antd';
import { Link, graphql } from 'gatsby';
import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';

const BlogIndex = ({ data }) => {
  const posts = [
    {
      id: 'post-id',
      date: '2020-04-29',
      slug: 'post-slug',
      title: 'This is the title',
      description: 'This is the description.',
    },
  ];

  return (
    <Layout>
      <SEO title="Blog" />
      <List
        itemLayout="vertical"
        dataSource={posts}
        renderItem={(post) => (
          <List.Item
            key={post.id}
            extra={post.date}
            actions={[<Link to={`/blog/${post.slug}`}>Read more</Link>]}
          >
            <List.Item.Meta
              title={
                <Link to={`/blog/${post.slug}`}>{post.title}</Link>
              }
              description={post.description}
            />
          </List.Item>
        )}
      />
    </Layout>
  );
};

export default BlogIndex;
