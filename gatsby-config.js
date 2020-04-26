require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `Zena Elizabeth Hirsch`,
    description: `The personal website of Zena Elizabeth Hirsch.`,
    author: `@zenahirsch`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Zena Elizabeth Hirsch`,
        short_name: `Zena Elizabeth Hirsch`,
        description: `The personal website of Zena Elizabeth Hirsch`,
        start_url: `/`,
        background_color: `#fa8c16`,
        theme_color: `#fa8c16`,
        display: `minimal-ui`,
        icon: `src/images/fire.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-buttercms`,
      options: {
        authToken: process.env.BUTTER_AUTH_TOKEN,
      },
    },
    {
      resolve: `gatsby-plugin-antd`,
      options: {
        style: true,
      },
    },
    {
      resolve: `gatsby-plugin-less`,
      options: {
        modifyVars: {
          'primary-color': '@orange-6',
          'font-family': 'Nunito, sans-serif',
        },
        javascriptEnabled: true,
      },
    },
  ],
};
