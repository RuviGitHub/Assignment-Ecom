import React from "react";
import { Row, Col, Input, Button, Form } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import Header from "../components/Header";
import MyFooter from "../components/MyFooter";

const { TextArea } = Input;

const ContactUs = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Form values: ", values);
  };

  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center">
      <Header />
      <div className="container mx-auto px-6 md:px-12 lg:px-24 my-24">
        <Row gutter={[32, 32]}>
          {/* Contact Form */}
          <Col xs={24} md={12}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Contact Us</h2>
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: "Please enter your name" }]}
              >
                <Input placeholder="Your Name" />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input placeholder="Your Email" />
              </Form.Item>
              <Form.Item
                name="message"
                label="Message"
                rules={[
                  { required: true, message: "Please enter your message" },
                ]}
              >
                <TextArea rows={4} placeholder="Your Message" />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="bg-[#ea7c69] border-none"
                >
                  Send Message
                </Button>
              </Form.Item>
            </Form>
          </Col>

          {/* Contact Details */}
          <Col xs={24} md={12} className="flex flex-col justify-center">
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-2">Our Address</h3>
              <p className="text-gray-600">
                <EnvironmentOutlined className="text-[#ea7c69] mr-2" />
                1234 Street Name, City, Country
              </p>
            </div>
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-2">Phone</h3>
              <p className="text-gray-600">
                <PhoneOutlined className="text-[#ea7c69] mr-2" />
                +123 456 7890
              </p>
            </div>
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p className="text-gray-600">
                <MailOutlined className="text-[#ea7c69] mr-2" />
                info@yourdomain.com
              </p>
            </div>
          </Col>
        </Row>
      </div>
      <MyFooter />
    </div>
  );
};

export default ContactUs;
