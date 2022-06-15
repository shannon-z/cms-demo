import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { List, Button, Skeleton, Pagination, message } from 'antd';
import { getArticleListApi, ArticleDelApi } from '../request/api';
import moment from 'moment';

const ListList = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState([]);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const onChange = () => {};

  const delFn = id => {
    ArticleDelApi({ id }).then(res => {
      if (res.errCode === 0) {
        message.success(res.message);
        getList()
      } else {
        message.success(res.message);
      }
    });
  };

  const getList = () => {
    getArticleListApi({
      num: current,
      count: pageSize
    }).then(res => {
      if (res.errCode === 0) {
        let { arr, total, num, count } = res.data;
        setUserData(arr);
        setTotal(total);
        setCurrent(num);
        setPageSize(count);
      }
    });
  }

  useEffect(() => {
    getList()
  }, []);

  return (
    <div className='list_table'>
      <List
        className='demo-loadmore-list'
        itemLayout='horizontal'
        dataSource={userData}
        renderItem={item => (
          <List.Item
            actions={[
              <Button
                type='primary'
                onClick={() => navigate('/edit/' + item.id)}>
                编辑
              </Button>,
              <Button type='danger' onClick={() => delFn(item.id)}>
                删除
              </Button>
            ]}>
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                title={<a href='./'>{item.title}</a>}
                description={item.subTitle}
              />
              <div>{moment(item.date).format('YYYY-MM-DD hh:mm:ss')}</div>
            </Skeleton>
          </List.Item>
        )}
      />
      <Pagination
        onChange={onChange}
        total={total}
        current={current}
        pageSize={pageSize}></Pagination>
    </div>
  );
};

export default ListList;
