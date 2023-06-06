import { Typography } from 'antd';
import { graphql } from 'gatsby';
import React from 'react';

import Layout from '../components/layout';
import Seo from '../components/seo';

const { Title } = Typography;

const FAQPage = ({ data }) => {
  const faqs = data.markdownRemark.fields.faqhtml;

  return (
    <Layout>
      <Seo title="FAQ" />
      {faqs.map(({ question, answer }, index) => (
        <div key={index}>
          <Title level={4}>{question}</Title>
          <div dangerouslySetInnerHTML={{ __html: answer }} />
        </div>
      ))}
    </Layout>
  );
};

export default FAQPage;

// The faq content is found in `fields` because it has
// been processed by the onCreateNode hook (gatsby-node.js).
export const pageQuery = graphql`
  query {
    markdownRemark(frontmatter: { path: { eq: "/faq" } }) {
      fields {
        faqhtml {
          question
          answer
        }
      }
    }
  }
`;
