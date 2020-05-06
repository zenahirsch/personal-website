import { Typography } from 'antd';
import { Link, graphql } from 'gatsby';
import React from 'react';
import {
  Area,
  ComposedChart,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import Layout from '../components/layout';
import SEO from '../components/seo';

const { Title, Paragraph } = Typography;

const StalkMarketPage = ({ data }) => {
  const { title } = data.markdownRemark.frontmatter;
  const {
    filter,
    minMaxPattern,
    purchasePrice,
    weekStarting,
  } = data.markdownRemark.fields.acTurnipApiData;

  const dayLabels = [
    'Mon AM',
    'Mon PM',
    'Tue AM',
    'Tue PM',
    'Wed AM',
    'Wed PM',
    'Thu AM',
    'Thu PM',
    'Fri AM',
    'Fri PM',
    'Sat AM',
    'Sat PM',
  ];

  filter.shift(); // remove the purchase price from the filter array

  const chartData = dayLabels.map((dayLabel, i) => ({
    day: dayLabel,
    minMax: filter[i] ? [filter[i], filter[i]] : minMaxPattern[i],
  }));

  return (
    <Layout>
      <SEO title={title} description="ACNH Turnip Prices graph" />
      <Title level={3}>{title}</Title>
      <Paragraph>
        Like most people during this quarantine, I've been playing a lot of{' '}
        <em>Animal Crossing: New Horizons</em>. This graph shows my{' '}
        <a href="https://animalcrossing.fandom.com/wiki/White_turnip">
          Stalk Market
        </a>{' '}
        predictions, based on known values collected so far this week. The data
        is pulled using elxris's{' '}
        <a href="https://github.com/elxris/Turnip-Calculator/issues/72#issuecomment-617483396">
          Turnip Calculator API
        </a>
        , and displayed using <a href="https://recharts.org/en-US">Recharts</a>.
      </Paragraph>
      <Paragraph>
        Feel free to <Link to="/contact">reach out</Link> for a Dodo Code if
        you'd like to come sell your turnips!
      </Paragraph>
      <br />
      <Title level={4} style={{ textAlign: 'center' }}>
        Stalk market predictions for week of {weekStarting}
      </Title>
      <ResponsiveContainer width="100%" height={325}>
        <ComposedChart data={chartData}>
          <Legend verticalAlign="top" height={36} />
          <XAxis dataKey="day" interval={1} />
          <YAxis padding={{ top: 20 }} />
          <Area
            type="monotone"
            name="MinMax Values"
            dataKey="minMax"
            stroke="#d46b08"
            strokeWidth={2}
            fill="#fa8c16"
          />
          <ReferenceLine
            y={purchasePrice}
            label={{
              value: `Purchase Price (${purchasePrice})`,
              position: 'insideBottom',
              style: { opacity: 0.4 },
            }}
            stroke="#fa541c"
            strokeWidth={2}
            strokeDasharray="3 3"
          />
          <Tooltip />
        </ComposedChart>
      </ResponsiveContainer>
    </Layout>
  );
};

export default StalkMarketPage;

export const pageQuery = graphql`
  query {
    markdownRemark(frontmatter: { path: { eq: "/stalk-market" } }) {
      frontmatter {
        title
      }
      fields {
        acTurnipApiData {
          filter
          weekStarting(formatString: "dddd, MMMM D")
          purchasePrice
          minMaxPattern
          avgPattern
          minWeekValue
          preview
        }
      }
    }
  }
`;
