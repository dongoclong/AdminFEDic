import React, { useEffect } from 'react';
import {Modal, Table, Space, Button, Spin } from 'antd';
import { useState } from 'react';
import { getAllWord, deleteWord, addWord, updateWord } from '../../services/wordService';
import AddWord from '../handleword/addword'


const loginInfo = localStorage.getItem('loginInfo');
const userIdLogin = loginInfo ? JSON.parse(loginInfo).userId : null;

const Word = () => {
  const [WordData, setWordData] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentWord, setCurrentWord] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);


  useEffect(() => {
    const getWord = async () => {
      setLoading(true);
      try {
        const response = await getAllWord();
          setWordData(response);
          console.log(response);
          setLoading(false);
      } catch (error) {
        setError('Fetch data fail')
        setLoading(false)
      }
    };
    getWord();
  }, []);

  const handleEdit = (record) => {
    console.log('Editing record', record);
    // showEditModal(record);
    // Prepare any additional logic for editing here
  };

  const handleAddWord = (newWord) => {
    setWordData([...WordData, newWord]);
    setIsAddModalVisible(false);
  };

  const handleCancelAdd = () => {
    setIsAddModalVisible(false);
  };

  const columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      render: (_, __, index) => index + 1,
      width: 50,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
    },
    {
      title: 'Word',
      dataIndex: 'word',
      key: 'word',
      sorter: (a, b) => a.word.localeCompare(b.word),
    },
    {
      title: 'Meaning',
      dataIndex: 'meaning',
      key: 'meaning',
      sorter: (a, b) => a.meaning.localeCompare(b.meaning),
    },
    {
      title: 'Description',
      dataIndex: 'note',
      key: 'note',
      sorter: (a, b) => a.note.localeCompare(b.note),
      render: text => (
        <div>
          {text.length > 30 ? `${text.substring(0, 23)}...` : text}
        </div>
      ),
    },
    {
      title: 'User Edit',
      dataIndex: 'user_add',
      key: 'user_add',
      sorter: (a, b) => a.user_add.localeCompare(b.user_add),
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: image => <img src={image[0].link} style={{ width: 25, height: 25 }} />,
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
      sorter: (a, b) => a.subject.localeCompare(b.subject),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Button danger onClick={() => handleDelete(record)}>Delete</Button>
        </Space>
      ),
    },
  ];

  const handleDelete = (record) => {
    // Define a function to handle actual deletion
    console.log('Deleting record', record);
    const deleteEmployee = async (userIdDelete, userId) => {
      try {
        const userId = record.Id;
        console.log(record.Id)
        const response = await deleteWord(userIdLogin, userId);
        if (response.status === 200)
        {
          setCurrentWord(currentWord.filter((word) => word.id !== record.id));
        } else
        {
          console.error('Error deleting employee:', response);
        }
      } catch (error) {
        console.log('Error deleting employee:', error);
      }
    };
    Modal.confirm({
      title: 'Confirm Delete',
      content: 'Are you sure you want to delete this Word ?',
      okText: 'Yes',
      cancelText: 'No',
      onOk() {
        deleteEmployee();
      },
    });
  }; 

  return (
    <div>
      <h2>Manager Word</h2>
      <Button type="primary" onClick={() => setIsAddModalVisible(true)}>
        Add Word
      </Button>
      <div style={{ position: 'relative' }}>
        {loading && (
          <div style={{
            position: 'fixed',
            top: '45%',
            left: '55%',
            transform: 'translate(-50%, -50%)',
            zIndex: 9999
          }}>
            <Spin tip="Loading..." size="large" />
          </div>
        )}
        <Table columns={columns} dataSource={WordData} pagination={{ pageSize: 6 }} />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <AddWord
        open={isAddModalVisible}
        onOk={handleAddWord}
        onCancel={handleCancelAdd}
      />
    </div>
  );
};

export default Word;
  