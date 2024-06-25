import React from 'react';
import { Table } from 'antd';

const PreviewWord = () => {
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
      title: 'Date2',
      dataIndex: 'date2',
      key: 'date2',
      sorter: (a, b) => new Date(a.date2) - new Date(b.date2),
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
    },
    {
      title: 'User Edit status',
      dataIndex: 'user_add',
      key: 'user_add',
      sorter: (a, b) => a.user_add.localeCompare(b.user_add),
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: image => <img src={image} alt="Word" style={{ width: 25, height: 25 }} />,
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
      sorter: (a, b) => a.subject.localeCompare(b.subject),
    },
  ];

  // Sample data
  const data = [
    {
      key: '1',
      date: '2023-01-01',
      date2: '2023-01-02',
      word: 'Example',
      meaning: 'A thing characteristic of its kind or illustrating a general rule.',
      note: 'Used in a sentence as an example.',
      user_add: 'Admin',
      image: 'https://example.com/path/to/image.jpg',
      subject: 'English',
    },
    // Add more data objects here as needed
  ];

  return (
    <div>
      <h2>Manager Account</h2>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
    </div>
  );
};

export default PreviewWord;
