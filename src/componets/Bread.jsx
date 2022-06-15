import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

const Bread = () => {
  const [breadName, setBreadName] = useState('');
  const { pathname } = useLocation();

  useEffect(() => {
    switch (pathname) {
      case '/list':
        setBreadName('文章列表-List');
        break;
      case '/list-table':
        setBreadName('文章列表-Table');
        break;
      case '/edit':
        setBreadName('文章编辑');
        break;
      case '/means':
        setBreadName('修改资料');
        break;
      default:
        setBreadName(pathname.includes('edit') ? '文章编辑' : '');
        break;
    }
  }, [pathname]);

  return (
    <Breadcrumb>
      <Breadcrumb.Item href=''>
        <HomeOutlined />
      </Breadcrumb.Item>
      <Breadcrumb.Item>{ breadName }</Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default Bread;
