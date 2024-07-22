import React, { useEffect } from 'react';
import {Modal, Table, Space, Button, Spin } from 'antd';
import { useState } from 'react';
import { getAllWord, deleteWord, addWord, updateWord } from '../../services/wordService';

const loginInfo = localStorage.getItem('loginInfo');
const userIdLogin = loginInfo ? JSON.parse(loginInfo).userId : null;

const PreviewWord = () => {
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
        setLoading(false)
      }
    };
    getWord();
  }, []);

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
  ];

  return (
    <div>
      <h2>Manager Word</h2>
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
        <Table columns={columns} dataSource={WordData} pagination={{ pageSize: 8 }} />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default PreviewWord;
  