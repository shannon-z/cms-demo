import React from "react";
import { Outlet } from "react-router-dom";
import './assets/common.less'
import { Layout } from "antd";
import Header from "./componets/Header";

const App = () => {
  const { Sider, Content } = Layout
  
  return (
    <Layout id="app">
      <Header/>
      <Layout>
        <Sider>Sider</Sider>
        <Content>
          <div>
            <Outlet />
          </div>
        </Content>
      </Layout>
      <footer>footer</footer>
    </Layout>
  );
}

export default App