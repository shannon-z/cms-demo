import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import React from 'react'
import '../assets/login.less'
import { Link, useNavigate } from 'react-router-dom';
import { loginApi } from '../request/api';

const Login = () => {
  const navigate = useNavigate()
  
  const onFinish = values => {
    loginApi({
      username: values.username,
      password: values.password
    }).then(res => {
      console.log(res);
      if (res.errCode === 0) {
        message.success(res.message);
        // 存储数据
        localStorage.setItem('avatar', res.data.avatar);
        localStorage.setItem('cms-token', res.data['cms-token']);
        localStorage.setItem('editable', res.data.editable);
        localStorage.setItem('player', res.data.player);
        localStorage.setItem('username', res.data.username);
        // 跳转到根路径
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        message.error(res.message);
      }
    });
  }

  const onFinishFailed = () => {

  }

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
          rule="{[{required: true, message: 'please input your username'}]}">
          <Input
            size='large'
            prefix={<UserOutlined className='site-form-item-icon' />}
            placeholder='please input your username'
          />
        </Form.Item>
        <Form.Item
          name='password'
          rule={[{ require: true, message: 'please input your password' }]}>
          <Input.Password
            size='large'
            prefix={<LockOutlined className='site-form-item-icon' />}
            placeholder='please input your password'
          />
        </Form.Item>
        <Form.Item>
          <Link to="/register">have no accout? register</Link>
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit' block size='large'>
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login