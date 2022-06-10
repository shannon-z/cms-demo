import React, {useState, useEffect} from 'react';
import { Menu, Dropdown, Avatar, message } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [avatar, setAvatar] = useState('https://joeschmoe.io/api/v1/random');
  const [username, setUsername] = useState('游客');
  const navigate = useNavigate()

  useEffect(() => {
    const localname = localStorage.getItem('username')
    if (localname) {
      setUsername(localname);
    }
  }, [])

  const logout = () => {
    
    message.success('logout successfully')
    localStorage.clear()
    setTimeout(() => navigate('/login'), 1000)
  }

  const menu = (
    <Menu>
      <Menu.Item>
        <a href='http://www.taobao.com/'>修改资料</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <span onClick={logout}>退出登录</span>
      </Menu.Item>
    </Menu>
  );
  return (
    <div>
      <header>
        <div className='title'>CMS-DEMO</div>
        <div>
          <Avatar
            size={30}
            src={avatar}
            style={{ background: '#fff', marginRight: 8 }}
          />
          <Dropdown overlay={menu}>
            <span className='username'>
              {username} <CaretDownOutlined />
            </span>
          </Dropdown>
        </div>
      </header>
    </div>
  );
};

export default Header;
