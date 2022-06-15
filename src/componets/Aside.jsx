import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import {
  ReadOutlined,
  EditOutlined,
  DatabaseOutlined
} from '@ant-design/icons';

export default function Aside() {
  const navigate = useNavigate();
  const location = useLocation();

  const [defaultKey, setDefaultKey] = useState('')

  useEffect(val => {
    const path = location.pathname
    const key = path.split('/')[1]
    setDefaultKey(key)
  }, [])

  const handleClick = e => {
    navigate('/' + e.key);
    setDefaultKey(e.key)
  };

  return (
    <Menu
      onClick={handleClick}
      selectedKeys={[defaultKey]}
      style={{ width: 180 }}
      mode='inline'
      theme='dark'>
      <Menu.Item key='list'>
        <ReadOutlined />
        <span>查看文章列表</span>
      </Menu.Item>
      <Menu.Item key='list-table'>
        <ReadOutlined />
        <span>查看文章列表table</span>
      </Menu.Item>
      <Menu.Item key='edit'>
        <EditOutlined />
        <span>文章编辑</span>
      </Menu.Item>
      <Menu.Item key='means'>
        <DatabaseOutlined />
        <span>修改资料</span>
      </Menu.Item>
    </Menu>
  );
}
