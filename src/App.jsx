import React from "react";
import { Outlet } from "react-router-dom";
import './assets/common.less'
import { Layout } from "antd";
import Header from "./componets/Header";
import Aside from "./componets/Aside";
import Bread from "./componets/Bread";

const App = () => {
  const { Sider, Content } = Layout
  
  return (
    <Layout id='app'>
      <Header />
      <div className='container'>
        <Aside className='aside'></Aside>
        <div className='content'>
          <Bread></Bread>
          <div className='main'>
            <Outlet />
          </div>
        </div>
      </div>
      <footer>Respect | Copyright &copy; {new Date().getFullYear()} By SHA</footer>
    </Layout>
  );
}

export default App