import React, { useEffect, useState } from 'react';
import { PageHeader, Button, Modal, Form, Input, message } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';
import {
  ArticleAddApi,
  ArticleSearchApi,
  ArticleUpdateApi
} from '../request/api';
import Editor from '../componets/MyEditor';

const Edit = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        const { title, subTitle } = values;
        // form.resetFields();
        if (params.id) {
          ArticleUpdateApi({ title, subTitle, content }).then(res => {
            if (res.errCode === 0) {
              message.success(res.message);
              //跳转到list页面
              navigate('/list');
            } else {
              message.error(res.message);
            }
            setIsModalVisible(false);
          });
        } else {
          // 添加文章的请求
          ArticleAddApi({ title, subTitle, content }).then(res => {
            if (res.errCode === 0) {
              message.success(res.message);
              //跳转到list页面
              navigate('/list');
            } else {
              message.error(res.message);
            }
            setIsModalVisible(false);
          });
        }
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
    // .finally(() => {
    //   setIsModalVisible(false);
    // })
  };

  const addArticle = (title, subTitle, content) => {
    ArticleAddApi({ title, subTitle, content }).then(res => {
      console.log(res);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    console.log(params);
    if (params.id) {
      ArticleSearchApi(params.id).then(res => {
        if (res.errCode === 0) {
          setTitle(res.data.title);
          setSubTitle(res.data.subTitle);
          setContent(res.data.content); // 重新设置编辑器内容
        }
      });
    }
  }, []);

  return (
    <div>
      <PageHeader
        ghost={false}
        onBack={params.id ? () => window.history.back() : null}
        title='文章编辑'
        subTitle={moment(new Date()).format('YYYY-MM-DD')}
        extra={[
          <Button key='1' type='primary' onClick={showModal}>
            提交文章
          </Button>
        ]}></PageHeader>
      <Editor content={content} change={val => setContent(val)} />
      <Modal
        zIndex={99999}
        title='填写文章标题'
        visible={isModalVisible}
        okText='提交'
        cancelText='取消'
        onOk={handleOk}
        onCancel={handleCancel}>
        <Form
          name='basic'
          form={form}
          initialValues={{ title: title, subTitle: subTitle }}
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 21 }}
          autoComplete='off'>
          <Form.Item
            label='标题'
            name='title'
            rules={[{ required: true, message: '请填写标题!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label='副标题' name='subTitle'>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Edit;
