const path = require('path');
const fetch = require('node-fetch');
const remark = require('remark');
const remarkHTML = require('remark-html');

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;
  const blogPostTemplate = path.resolve('src/templates/blog-post.js');
  const pageTemplate = path.resolve('src/templates/page.js');
  const turnipPricesTemplate = path.resolve('src/templates/turnip-prices.js');

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
              slug
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

      TurnipData: markdownRemark(
        frontmatter: { path: { eq: "/turnip-prices" } }
      ) {
        frontmatter {
          path
          weekly_turnip_price_records {
            purchase_price
            week_starting
            turnip_prices {
              day
              price
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

  const { Posts, Pages, TurnipData } = result.data;

  Posts.edges.forEach(({ node }) => {
    createPage({
      path: `blog/${node.frontmatter.slug}`,
      component: blogPostTemplate,
      context: {
        slug: node.frontmatter.slug,
      },
    });
  });

  Pages.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.path,
      component: pageTemplate,
      context: {},
    });
  });

  TurnipData.frontmatter.weekly_turnip_price_records.sort(
    (a, b) => new Date(b.week_starting) - new Date(a.week_starting)
  );

  const recent_record = TurnipData.frontmatter.weekly_turnip_price_records[0];
  const { week_starting, purchase_price, turnip_prices } = recent_record;
  const prices = turnip_prices.map((turnip_price) => turnip_price.price);
  const turnipData = await fetch(
    `https://api.ac-turnip.com/data/?f=${purchase_price}-${prices.join('-')}`
  );
  const resultData = await turnipData.json();
  const weekStartingDate = new Date(week_starting);

  createPage({
    path: TurnipData.frontmatter.path,
    component: turnipPricesTemplate,
    context: {
      filter: resultData.filter,
      minMaxPattern: resultData.minMaxPattern,
      avgPattern: resultData.avgPattern,
      minWeekValue: resultData.minWeekValue,
      preview: resultData.preview,
      weekStarting: weekStartingDate.toLocaleDateString('en-US'),
      purchasePrice: purchase_price,
      turnipPrices: turnip_prices,
    },
  });
};

exports.onCreateNode = ({ node, actions: { createNodeField } }) => {
  const { frontmatter } = node;

  // If the frontmatter contains `faq`, parse
  // the markdown contained therein.
  if (frontmatter && frontmatter.faq) {
    const value = frontmatter.faq.map((faq) => ({
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
