import React, { useState, useEffect } from "react";
import { Table, Tag, Space, Input, Button, Modal, Form, message } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import Header from "../components/Header";
import MyFooter from "../components/MyFooter";

const { Column } = Table;

const Inquiry = () => {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/inquiries/all");
      if (response.data.statusCode === 200) {
        setData(response.data.data);
      } else {
        message.error("Failed to fetch inquiries.");
      }
    } catch (error) {
      console.error("Error fetching inquiries:", error);
      message.error("An error occurred while fetching inquiries.");
    }
  };

  const handleSearch = (selectedKeys, confirm) => {
    confirm();
    setSearchText(selectedKeys[0]);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
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
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
  });

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      await axios.post("http://localhost:8080/api/v1/inquiries/create", {
        customerId: 1, // Replace with actual customer ID if available
        date: new Date().toISOString().split("T")[0], // Current date in YYYY-MM-DD format
        ...values,
        status: "PENDING",
      });
      message.success("Inquiry created successfully!");
      setIsModalVisible(false);
      form.resetFields();
      fetchInquiries(); // Refresh the list after creating a new inquiry
    } catch (error) {
      console.error("Error creating inquiry:", error);
      message.error("Failed to create inquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Inquiries</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
          Make Inquiry
        </Button>
        <div className="bg-white rounded-lg shadow-md overflow-hidden mt-4">
          <Table
            dataSource={data}
            pagination={false}
            scroll={{ y: 400 }}
            className="w-full"
          >
            <Column title="ID" dataIndex="id" key="id" {...getColumnSearchProps("id")} />
            <Column title="Date" dataIndex="date" key="date" sorter={(a, b) => new Date(a.date) - new Date(b.date)} />
            <Column title="Title" dataIndex="title" key="title" {...getColumnSearchProps("title")} />
            <Column title="Description" dataIndex="description" key="description" ellipsis={true} />
            <Column
              title="Status"
              dataIndex="status"
              key="status"
              render={(status) => (
                <Tag color={status === "PENDING" ? "gold" : status === "RESOLVED" ? "green" : "volcano"}>
                  {status.toUpperCase()}
                </Tag>
              )}
              filters={[
                { text: "Pending", value: "PENDING" },
                { text: "Resolved", value: "RESOLVED" },
                { text: "Closed", value: "CLOSED" },
              ]}
              onFilter={(value, record) => record.status.indexOf(value) === 0}
            />
            <Column title="Response" dataIndex="response" key="response" ellipsis={true} />
           
          </Table>
        </div>
      </main>
      <MyFooter />
      <Modal
        title="New Inquiry"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={loading}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please enter the title of the inquiry" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter the description of the inquiry" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Inquiry;
