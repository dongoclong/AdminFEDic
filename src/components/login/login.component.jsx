import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Spin } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.scss'; // Import SCSS module
import { login } from '../../services/loginService';
import { Alert } from 'antd';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const data = await login(values.username, values.password);
      console.log(values.username, values.password)
      console.log('Login data:', data);
      if (data.status === 200) {
        localStorage.setItem('loginInfo', JSON.stringify(data));
        navigate('/admin'); // navigate to the admin page
        setLoading(false);
      } else {
        setError(data.message || "Authentication failed. Please check your credentials.");
        setLoading(false);
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Authentication failed. Please try again later.');
      setLoading(false);
    }
  };

  return (
    <div className={styles['login-form-container']}>
      <Spin spinning={loading}>
        <Form
          name="normal_login"
          className={styles['login-form']}
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Checkbox name="remember">Remember me</Checkbox>
            {error && <Alert message={error} type="error" showIcon />} 
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className={styles['login-form-button']}>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
};

export default LoginPage;
