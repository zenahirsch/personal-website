const path = require('path');
const remark = require('remark');
const remarkHTML = require('remark-html');

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;
  const blogPostTemplate = path.resolve('src/templates/blog-post.js');
  const pageTemplate = path.resolve('src/templates/page.js');
  const result = await graphql(`
    {
      Posts: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/(posts)/" } }
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }

      Pages: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/(pages)/" } }
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `);

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild('Error while running GraphQL query.');
    return;
  }

  result.data.Posts.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.path,
      component: blogPostTemplate,
      context: {}, // additional data can be passed via context
    });
  });

  result.data.Pages.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.path,
      component: pageTemplate,
      context: {}, // additional data can be passed via context
    });
  });
};

exports.onCreateNode = ({ node, actions: { createNodeField } }) => {
  const { frontmatter } = node;

  // If the frontmatter contains `faq`, parse
  // the markdown contained therein.
  if (frontmatter && frontmatter.faq) {
    const value = frontmatter.faq.map(faq => ({
      question: faq.question,
      answer: remark().use(remarkHTML).processSync(faq.answer).toString(),
    }));

    createNodeField({
      name: 'faqhtml',
      node,
      value,
    });
  }
};