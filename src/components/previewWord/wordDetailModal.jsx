import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button, message, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { updateWord } from '../../services/wordService';

const loginInfo = localStorage.getItem('loginInfo');
const userId = loginInfo ? JSON.parse(loginInfo).userId : null;

const WordDetailModal = ({ open, word, onCancel }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (word) {
      const imageList = word.image ? word.image.map((img, index) => ({
        uid: `-${index}`,
        name: `image${index}.png`,
        status: 'done',
        url: img.link,
      })) : [];
      form.setFieldsValue({
        ...word,
        image: imageList,
      });
      setFileList(imageList);
    }
  }, [word, form]);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handleChange = ({ fileList }) => {
    setFileList(fileList);
  };

  return (
    <Modal
      title="Word Detail"
      open={open}
      onOk={() => form.submit()}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Close
        </Button>,
      ]}
    >
      <Form
        layout="vertical"
        form={form}
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
          <Input/>
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
        <Form.Item
          label="Image"
          name="image"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload disabled
            listType="picture-card"
            fileList={fileList}
            onChange={handleChange}
            multiple
          >
            {fileList.length >= 5 ? null : (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default WordDetailModal;
