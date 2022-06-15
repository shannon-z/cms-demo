import React, { useState, useEffect } from 'react';
import { Table, Tag, Space, Button } from 'antd';
import { Link } from 'react-router-dom';
import '../assets/list-table.less';
import { getArticleListApi } from '../request/api';
import moment from 'moment';

const MyTitle = props => {
  return (
    <div>
      <Link to='/' className='table-item-title'>
        {props.title}
      </Link>
      <div style={{ color: '#ccc' }}>{props.subTitle}</div>
    </div>
  );
};

const ListTable = () => {
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 12,
      address: 'New York No. 1 Lake Park'
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 12,
      address: 'London No. 1 Lake Park'
    },
    {
      key: '3',
      age: 12,
      name: 'Joe Black',
      address: 'Sidney No. 1 Lake Park'
    }
  ];

  const [userData, setUserData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });

  const columns = [
    {
      title: 'mytitle',
      dataIndex: 'mytitle',
      key: 'mytitle',
      render: text => <div>{text}</div>
    },
    {
      title: 'date',
      dataIndex: 'date',
      key: 'date'
    },
    {
      title: 'action',
      key: 'action',
      render: (cxt, record) => (
        <Space size='middle'>
          <Button type='primary' onClick={() => console.log(cxt.key)}>
            编辑
          </Button>
          <Button type='danger'>删除</Button>
        </Space>
      )
    }
  ];

  const getArticleList = (current, pageSize) => {
    let tempData = [];
    getArticleListApi({
      num: current,
      count: pageSize
    }).then(res => {
      if (res.errCode === 0) {
        const temp = res.data.arr;
        tempData = temp.map(item => ({
          key: item.id,
          mytitle: <MyTitle {...item}></MyTitle>,
          date: moment(item.date).format('YYYY-MM-DD hh:mm:ss')
        }));
        setUserData(tempData);

        const { num, count, total } = res.data;
        setPagination({ current: num, pageSize: count, total });
      }
    });
  };

  const pageChange = val => {
    getArticleList(val.current, val.pageSize)
  }

  useEffect(() => {
    getArticleList(pagination.current, pagination.pageSize);
  }, []);

  return (
    <div>
      <Table
        columns={columns}
        showHeader={true}
        dataSource={userData}
        pagination={pagination}
        onChange={pageChange}
      ></Table>
    </div>
  );
};

export default ListTable;
