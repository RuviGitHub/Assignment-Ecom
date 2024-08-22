import React, { useState } from 'react';
import { Table, Tag, Space, Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Header from '../components/Header';
import MyFooter from '../components/MyFooter';
const { Column } = Table;

const Inquiry = () => {
  const [searchText, setSearchText] = useState('');

  const data = [
    {
      key: '1',
      id: 'INQ001',
      date: '2023-08-19',
      title: 'Delivery Issue',
      description: "My order hasn't arrived yet",
      status: 'Pending',
      response: "We're looking into it",
    },
    // Add more mock data here
  ];

  const handleSearch = (selectedKeys, confirm) => {
    confirm();
    setSearchText(selectedKeys[0]);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Inquiries</h1>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <Table dataSource={data} pagination={{ pageSize: 10 }} className="w-full">
            <Column title="ID" dataIndex="id" key="id" {...getColumnSearchProps('id')} />
            <Column title="Date" dataIndex="date" key="date" sorter={(a, b) => new Date(a.date) - new Date(b.date)} />
            <Column title="Title" dataIndex="title" key="title" {...getColumnSearchProps('title')} />
            <Column title="Description" dataIndex="description" key="description" ellipsis={true} />
            <Column
              title="Status"
              dataIndex="status"
              key="status"
              render={(status) => (
                <Tag color={status === 'Pending' ? 'gold' : status === 'Resolved' ? 'green' : 'volcano'}>
                  {status.toUpperCase()}
                </Tag>
              )}
              filters={[
                { text: 'Pending', value: 'Pending' },
                { text: 'Resolved', value: 'Resolved' },
                { text: 'Closed', value: 'Closed' },
              ]}
              onFilter={(value, record) => record.status.indexOf(value) === 0}
            />
            <Column title="Response" dataIndex="response" key="response" ellipsis={true} />
            <Column
              title="Action"
              key="action"
              render={(text, record) => (
                <Space size="middle">
                  <a href={`/inquiry/${record.id}`}>View</a>
                  <a href={`/inquiry/${record.id}/edit`}>Edit</a>
                </Space>
              )}
            />
          </Table>
        </div>
      </main>
      <MyFooter />
    </div>
  );
};

export default Inquiry;