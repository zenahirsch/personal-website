const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const blogPost = path.resolve('./src/templates/blog-post.js');

  let posts;
  try {
    posts = await graphql(`
      {
        allButterPost {
          edges {
            node {
              id
              seo_title
              slug
              author {
                first_name
                last_name
                email
                slug
                profile_image
              }
              body
            }
          }
        }
      }
    `);
  } catch (error) {
    console.log('Error Running Querying Posts', error);
  }

  posts = posts.data.allButterPost.edges;

  posts.forEach((post, index) => {
    createPage({
      path: `/blog/${post.node.slug}`,
      component: blogPost,
      context: {
        slug: post.node.slug,
      },
    });
  });
};
