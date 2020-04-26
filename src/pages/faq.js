import { Typography } from 'antd';
import { graphql } from 'gatsby';
import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';

const { Title } = Typography;

const FAQPage = ({ data }) => {
  const { faqs } = data.butterPage;

  return (
    <Layout>
      <SEO title="FAQ" />
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

export const query = graphql`
  {
    butterPage(slug: { eq: "faq" }) {
      faqs {
        question
        answer
      }
    }
  }
`;
