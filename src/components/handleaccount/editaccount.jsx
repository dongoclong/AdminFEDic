import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button, message, Upload, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { updateUser } from '../../services/acountService';

const { Option } = Select;

const loginInfo = localStorage.getItem('loginInfo');
const userId = loginInfo ? JSON.parse(loginInfo).userId : null;

const EditUser = ({ open, onOk, onCancel, user }) => {
  const [form] = Form.useForm();
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        id_user: user.id_user,
        user_name: user.user_name,
        password: user.password,
        role: user.role,
      });
    }
  }, [user, form]);

  const handleFinish = async (values) => {
    console.log('Received values of form: ', values);
    const completeData = {
      user_add: userId,
      user_name: values.user_name,
      password: values.password,
      role: values.role,
    };

    try {
      const response = await updateUser(completeData);
      console.log(response);
      if (response.statusCode !== '200') {
        message.error(response.message);      
      } else {
        message.success('User updated successfully');
        console.log('API Response:', response);
        onOk(response);
      }
    } catch (error) {
      message.error('Error updating user');
      console.error('Error updating user:', error);
    }
  };

  return (
    <Modal
      title="Edit User"
      open={open}
      onOk={() => form.submit()}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={() => form.submit()}>
          Submit
        </Button>,
      ]}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleFinish}
      >
        <Form.Item
          label="Id"
          name="id_user"
          rules={[{ required: true, message: 'Please input the user id!' }]}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          label="UserName"
          name="user_name"
          rules={[{ required: true, message: 'Please input the username!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input the password!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Role"
          name="role" 
          rules={[{ required: true, message: 'Please select the role!' }]}
        >
          <Select placeholder="Select a role">
            <Option value="1">Admin</Option>
            <Option value="2">Customer</Option>
            <Option value="3">Long deptrai 2k2</Option>
            <Option value="4">Long deptrai</Option>
            <Option value="5">Long sieudeptrai</Option>
          </Select>
        </Form.Item>

        {/* <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
          <Upload action="/upload.do" listType="picture-card">
            <button
              style={{
                border: 0,
                background: 'none',
              }}
              type="button"
            >
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </button>
          </Upload>
        </Form.Item> */}
      </Form>
    </Modal>
  );
};

export default EditUser;
