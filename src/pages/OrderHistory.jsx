import React, { useState } from 'react';
import { Table, Tag, Space, Input, Button, Tooltip } from 'antd';
import { SearchOutlined, EyeOutlined } from '@ant-design/icons';
import Header from '../components/Header';
import MyFooter from '../components/MyFooter';

const { Column } = Table;

const OrderHistory = () => {
  const [searchText, setSearchText] = useState('');

  const data = [
    {
      key: '1',
      id: 'ORD001',
      date: '2023-08-19',
      total: 59.99,
      items: ['Pizza Margherita', 'Coke'],
      status: 'Delivered',
      paymentMethod: 'Credit Card',
    },
    {
      key: '2',
      id: 'ORD002',
      date: '2023-08-18',
      total: 45.50,
      items: ['Chicken Wings', 'Fries', 'Sprite'],
      status: 'Processing',
      paymentMethod: 'PayPal',
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
        <h1 className="text-3xl font-bold mb-6">Order History</h1>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <Table dataSource={data} pagination={{ pageSize: 10 }} className="w-full">
            <Column title="Order ID" dataIndex="id" key="id" {...getColumnSearchProps('id')} />
            <Column 
              title="Date" 
              dataIndex="date" 
              key="date" 
              sorter={(a, b) => new Date(a.date) - new Date(b.date)}
            />
            <Column 
              title="Total" 
              dataIndex="total" 
              key="total"
              render={(total) => `$${total.toFixed(2)}`}
              sorter={(a, b) => a.total - b.total}
            />
            <Column 
              title="Items" 
              dataIndex="items" 
              key="items"
              render={(items) => (
                <Tooltip title={items.join(', ')}>
                  <span>{items.length} item(s)</span>
                </Tooltip>
              )}
            />
            <Column
              title="Status"
              dataIndex="status"
              key="status"
              render={(status) => (
                <Tag color={status === 'Delivered' ? 'green' : status === 'Processing' ? 'blue' : 'orange'}>
                  {status.toUpperCase()}
                </Tag>
              )}
              filters={[
                { text: 'Delivered', value: 'Delivered' },
                { text: 'Processing', value: 'Processing' },
                { text: 'Pending', value: 'Pending' },
              ]}
              onFilter={(value, record) => record.status.indexOf(value) === 0}
            />
            <Column title="Payment Method" dataIndex="paymentMethod" key="paymentMethod" />
            <Column
              title="Action"
              key="action"
              render={(text, record) => (
                <Space size="middle">
                  <Tooltip title="View Order Details">
                    <Button type="primary" icon={<EyeOutlined />} href={`/order/${record.id}`} />
                  </Tooltip>
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

export default OrderHistory;