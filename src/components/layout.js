import './layout.css';

import { FireTwoTone } from '@ant-design/icons';
import { Col, Grid, Menu, Row, Typography } from 'antd';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

const { useBreakpoint } = Grid;
const { Title, Text } = Typography;
const { SubMenu } = Menu;

const Layout = ({ children }) => {
  const screens = useBreakpoint();

  console.log('screens', screens);
  let key;
  if (typeof window !== 'undefined') {
    key = window.location.pathname.split('/')[1];
  }

  return (
    <div style={{ margin: '100px 0 0 0' }}>
      <Row justify="center" gutter={[16, 32]} style={{ textAlign: 'center' }}>
        <Col span={20}>
          <Title level={screens.xs ? 2 : 1}>
            <FireTwoTone twoToneColor="#ffd591" />
            <br />
            <Link to="/">Zena Elizabeth Hirsch</Link>
          </Title>
        </Col>
      </Row>
      <Row justify="center" gutter={[16, 32]} style={{ textAlign: 'center' }}>
        <Col xs={20} md={12}>
          <Menu mode="horizontal" selectedKeys={[key]}>
            <Menu.Item key="blog">
              <Link to="/blog">Blog</Link>
            </Menu.Item>
            <Menu.Item key="faq">
              <Link to="/faq">FAQ</Link>
            </Menu.Item>
            <SubMenu title="Social Media">
              <Menu.Item key="instagram">
                <a href="https://instagram.com/zehirsch">Instagram</a>
              </Menu.Item>
              <Menu.Item key="linkedin">
                <a href="https://www.linkedin.com/in/zenahirsch/">LinkedIn</a>
              </Menu.Item>
              <Menu.Item key="twitter">
                <a href="https://twitter.com/zenahirsch">Twitter</a>
              </Menu.Item>
              <Menu.Item key="vimeo">
                <a href="https://vimeo.com/zenahirsch">Vimeo</a>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="github">
              <a href="https://github.com/zenahirsch">Code</a>
            </Menu.Item>
            <Menu.Item key="contact">
              <Link to="/contact">Contact</Link>
            </Menu.Item>
          </Menu>
        </Col>
      </Row>
      <Row justify="center" gutter={[16, 32]}>
        <Col xs={20} md={12}>
          {children}
        </Col>
      </Row>
      <Row justify="center" gutter={[16, 32]} style={{ textAlign: 'center' }}>
        <Col xs={20} md={12}>
          <Text type="secondary">
            &copy; 2020 by Zena Hirsch.
            <br />
            Built with <a href="https://www.gatsbyjs.org/">Gatsby</a>,{' '}
            <a href="https://buttercms.com">ButterCMS</a> and{' '}
            <a href="https://ant.design">Ant Design</a>.
          </Text>
        </Col>
      </Row>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
