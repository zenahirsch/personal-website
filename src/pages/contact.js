import { Alert, Button, Form, Input, Space, Typography } from 'antd';
import React, { useState } from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';

const { Paragraph } = Typography;

const ContactPage = () => {
  const [form] = Form.useForm();
  const [alert, setAlert] = useState();

  const sendSlackMessage = async ({ name, email, message }) => {
    const data = {
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: message,
          },
        },
        {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: `*Name:* ${name ? name : 'Anonymous'}`,
            },
            {
              type: 'mrkdwn',
              text: `*Email:* ${email ? email : 'None provided'}`,
            },
          ],
        },
      ],
    };

    const response = await fetch(process.env.SLACK_WEBHOOK_URL, {
      method: 'POST',
      body: JSON.stringify(data),
    });

    return response.status;
  };

  const onFinish = (values) => {
    sendSlackMessage(values)
      .then((status) => {
        if (status !== 200) {
          console.error(status);
          setAlert({ message: 'There was an error.', type: 'error' });
          return;
        }

        setAlert({ message: 'Your message was sent!', type: 'success' });
        form.resetFields();
      })
      .catch((err) => {
        console.error(err);
        setAlert({ message: 'There was an error.', type: 'error' });
      });
  };

  return (
    <Layout>
      <SEO title="Contact" />
      <Paragraph>
        Feel free to reach out if you'd like to chat! I'll do my best to respond
        to messages as soon as possible. You can also find me on{' '}
        <a href="https://www.linkedin.com/in/zenahirsch/">LinkedIn</a>,{' '}
        <a href="https://github.com/zenahirsch">GitHub</a>, and{' '}
        <a href="https://twitter.com/zenahirsch">Twitter</a>.
      </Paragraph>

      <Space size="middle" direction="vertical" style={{ width: '100%' }}>
        {alert && <Alert message={alert.message} type={alert.type} />}

        <Form form={form} onFinish={onFinish}>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input your name.',
              },
            ]}
          >
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                type: 'email',
                message: 'Please input your email address.',
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="message"
            rules={[
              {
                required: true,
                message: 'Please add a message.',
              },
            ]}
          >
            <Input.TextArea
              placeholder="Message"
              autoSize={{ minRows: 3, maxRows: 6 }}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Send message
            </Button>
          </Form.Item>
        </Form>
      </Space>
    </Layout>
  );
};

export default ContactPage;
