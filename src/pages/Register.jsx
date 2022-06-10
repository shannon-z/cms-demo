import React from 'react'
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { registerApi } from '../request/api';

const Register = () => {
  const navigate = useNavigate();

  const onFinish = values => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    registerApi({
      username: values.username,
      password: values.password
    }).then(res => {
      if (res.errCode === 0) {
        message.success(res.message)
        setTimeout(() => navigate('/login'), 1000)
      } else {
        message.error(res.message)
      }
    })
  };

  const onFinishFailed = () => {};

  return (
    <div className='login'>
      <Form
        className='login-box'
        name='basic'
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'>
        <Form.Item
          name='username'
          rules={[{required: true, message: 'please input your username'}]}>
          <Input
            size='large'
            prefix={<UserOutlined className='site-form-item-icon' />}
            placeholder='please input your username'
          />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[{ required: true, message: 'please input your password' }]}>
          <Input.Password
            size='large'
            prefix={<LockOutlined className='site-form-item-icon' />}
            placeholder='please input your password'
          />
        </Form.Item>
        <Form.Item
          name='confirm'
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'please confirm your password'
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value) {
                  return Promise.reject()
                }
                if (value && getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                throw new Error(
                  'The two passwords that you entered do not match!'
                );
              }
            })
          ]}>
          <Input.Password
            size='large'
            prefix={<LockOutlined className='site-form-item-icon' />}
            placeholder='please confirm your password'
          />
        </Form.Item>
        <Form.Item>
          <Link to='/login'>have accout? login</Link>
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit' block size='large'>
            注册
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Register