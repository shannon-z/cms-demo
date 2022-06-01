import React from "react";
import { Outlet } from "react-router-dom";
import './assets/common.css'
import { Button } from "antd";

const App = () => {
  return (
    <div>
      <Button type="primary">primary</Button>
      <Outlet/>
    </div>
  )
}

export default App