import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button, message, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { updateWord, addWord } from '../../services/wordService';

const loginInfo = localStorage.getItem('loginInfo');
const userId = loginInfo ? JSON.parse(loginInfo).userId : null;

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const EditWord = ({ open, word, onOk, onCancel }) => {
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

  const handleChange = async ({ fileList }) => {
    const newFileList = await Promise.all(fileList.map(async (file) => {
      if (file.originFileObj) {
        const base64 = await getBase64(file.originFileObj);
        return {
          ...file,
          base64,
        };
      }
      return file;
    }));
    setFileList(newFileList);
  };

  const handleFinish = async (values) => {
    console.log('Received values of form: ', values);
    const completeData = {
      user_add: userId,
      word: values.word,
      meaning: values.meaning,
      note: values.note,
      image: values.image ? values.image.map(file => file.base64 || file.url) : [],
      subject: values.subject,
    };

    try {
      const response = await updateWord(completeData);
      console.log(response);
      if (response.statusCode !== '200') {
        message.error(response.message);
      } else {
        message.success('Word added successfully');
        console.log('API Response:', response);
        onOk(response);
      }
    } catch (error) {
      message.error('Error adding word');
      console.error('Error adding word:', error);
    }
  };

  return (
    <Modal
      title="Edit Word"
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
        <Form.Item
          label="Upload"
          name="image"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
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

export default EditWord;
