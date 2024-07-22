import React from 'react';
import { Modal, Form, Input, Button, message, Upload,  } from 'antd';
import { useState } from 'react';
import {PlusOutlined} from '@ant-design/icons'
import {TextArea} from "antd/lib/input";
import { addWord } from '../../services/wordService';


const loginInfo = localStorage.getItem('loginInfo');
const userId = loginInfo ? JSON.parse(loginInfo).userId : null; // Ensure that loginInfo is not null

const AddUser = ({ open, onOk, onCancel }) => {
  const [form] = Form.useForm();
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const handleFinish = async (values) => {
    console.log('Received values of form: ', values);
    const completeData = {
      user_add: userId,
      word: values.word,
      meaning: values.meaning,
      note: values.note,
      image: values.image,
      subject: values.subject,
    };

    try {
      const response = await addWord(completeData);
      console.log(response);
      if (response.statusCode !== '200') {
        message.error(response.message);      
      } else {
        message.success('Word added successfully');
        console.log('API Response:', response);
        onOk(response); // Call the onOk passed from parent, and send form data to it
      }
    } catch (error) {
      message.error('Error adding word');
      console.error('Error adding word:', error);
    }
  };

  return (
    <Modal
      title="Add New Word"
      open={open}
      onOk={() => form.submit()} // Call form.submit to trigger onFinish
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
          label="Word"
          name="word"
          rules={[{ required: true, message: 'Please input the word!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Meaning"
          name="meaning"
          rules={[{ required: true, message: 'Please input the meaning!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="note"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="User Edit"
          name="user_add"
          initialValue={userId}
          hidden
        >
          <Input />
        </Form.Item>

        <Form.Item
            label="Subject"
            name="subject"
        >
          <Input />
        </Form.Item>

        <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
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
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddUser;
