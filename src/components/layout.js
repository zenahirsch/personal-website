import './layout.css';

import { FireTwoTone } from '@ant-design/icons';
import { Col, Grid, Menu, Row, Typography, ConfigProvider } from 'antd';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { orange } from '@ant-design/colors';

const { useBreakpoint } = Grid;
const { Title } = Typography;

const Layout = ({ children }) => {
  const screens = useBreakpoint();

  const [current, setCurrent] = useState();
  const onClick = (e) => {
    setCurrent(e.key);
  };

  const items = [
    {
      label: <Link to="/blog">Blog</Link>,
      key: 'blog',
    },
    {
      label: <Link to="/faq">FAQ</Link>,
      key: 'faq',
    },
    {
      label: <a href="https://github.com/zenahirsch">Code</a>,
      key: 'github',
    },
    {
      label: <Link to="/contact">Contact</Link>,
      key: 'contact',
    },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: orange[5],
          colorLink: orange[5],
          colorLinkHover: orange[4],
          fontFamily: 'Nunito, sans-serif',
        }
      }}
    >
      <div style={{ margin: '75px 0 0 0' }}>
        <Row justify="center" gutter={[16, 32]} style={{ textAlign: 'center', marginBottom: '1em' }}>
          <Col>
            <Title level={screens.xs ? 2 : 1}>
              <FireTwoTone twoToneColor="#ffd591" />
              <br />
              <Link to="/">Zena Elizabeth Hirsch</Link>
            </Title>
          </Col>
        </Row>
        <Row justify="center" gutter={[16, 32]} style={{ marginBottom: '2em' }}>
          <Col>
            <Menu onClick={onClick} mode="horizontal" selectedKeys={[current]} items={items} />
          </Col>
        </Row>
        <Row justify="center" gutter={[16, 32]} style={{ marginTop: '1em' }}>
          <Col xs={20} md={12}>
            <div style={{ minHeight: 'calc(100vh - 415px)' }}>{children}</div>
          </Col>
        </Row>
      </div>
    </ConfigProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
