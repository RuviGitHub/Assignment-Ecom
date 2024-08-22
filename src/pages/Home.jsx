import React, { useState, useEffect } from "react";
import FillButton from "../components/FillButton";
import Header from "../components/Header";
import MyFooter from "../components/MyFooter";
import { SearchOutlined } from "@ant-design/icons";
import { Col, Row, Input, Form, Button } from "antd";
import {
  CheckCircleOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import MainCard from "../components/MainCard";
import { Link } from "react-router-dom";
import axios from "axios";

const { TextArea } = Input;

const Home = () => {
  const [form] = Form.useForm();
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    // Fetch signature items from the API
    const fetchSignatureItems = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/item/favorite-items"
        );
        if (response.data.statusCode === 200) {
          setDishes(response.data.data);
        } else {
          console.error("Failed to fetch items:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching signature items:", error);
      }
    };

    fetchSignatureItems();
  }, []);

  const onFinish = (values) => {
    console.log("Form values: ", values);
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-between bg-background w-full max-w-full">
        <Header />
        <main className="w-full max-w-full overflow-hidden flex-grow">
          <div className="flex flex-col-reverse xl:flex-row items-center justify-between">
            {/* Left Side */}
            <div className="xl:w-1/2 flex flex-col items-center xl:items-start text-center xl:text-left pl-12">
              <h1 className="font-sans text-4xl md:text-5xl xl:text-6xl font-bold leading-tight">
                We're <span className="text-baseColor">Serious</span> For
              </h1>
              <h1 className="font-sans text-4xl md:text-5xl xl:text-6xl font-bold leading-tight">
                <span className="text-baseColor">Food</span> &{" "}
                <span className="text-yellow">Delivery.</span>
              </h1>

              <div className="mt-8">
                <FillButton>
                  <Link
                    to="/taste"
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    Order Now
                  </Link>
                </FillButton>
              </div>
            </div>

            {/* Right Side - Hero Image */}
            <div className="xl:w-1/2 flex justify-center xl:justify-end mt-12 xl:mt-0">
              <img
                src="src/assets/images/hero.png"
                alt="hero"
                className="w-full max-w-md xl:max-w-full"
              />
            </div>
          </div>
        </main>
        <section>
          <div className="bg-white">
            <div className="">
              <Row gutter={[32, 32]}>
                {/* Left Side - Image */}
                <Col xs={24} md={12} className="">
                  <img
                    src="src/assets/images/chef.png"
                    alt="Chef"
                    className="max-w-full h-auto"
                  />
                </Col>

                {/* Right Side - Content */}
                <Col xs={24} md={12} className="flex flex-col justify-center">
                  <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                    We are <span className="text-[#ea7c69]">more</span> than{" "}
                    <span className="text-yellow-500">ordinary</span> boutique
                  </h2>
                  <p className="text-gray-600 mt-4 mr-8">
                    This is a type of restaurant which typically serves food and
                    drink, in addition to light refreshments such as baked goods
                    or snacks. The term comes from the French word meaning food.
                  </p>

                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="flex items-center">
                      <CheckCircleOutlined className="text-[#ea7c69] text-xl mr-2" />
                      <span>Online Order</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircleOutlined className="text-[#ea7c69] text-xl mr-2" />
                      <span>24/7 Service</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircleOutlined className="text-[#ea7c69] text-xl mr-2" />
                      <span>Pre-Reservation Buffet</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircleOutlined className="text-[#ea7c69] text-xl mr-2" />
                      <span>Cook With You</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircleOutlined className="text-[#ea7c69] text-xl mr-2" />
                      <span>Super Chef</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircleOutlined className="text-[#ea7c69] text-xl mr-2" />
                      <span>Clean Kitchen</span>
                    </div>
                  </div>

                  <div className="mt-8">
                    <FillButton
                      onClick={() => console.log("Order Now clicked")}
                    >
                      <Link
                        to="/taste"
                        style={{ color: "inherit", textDecoration: "none" }}
                      >
                        Order Now
                      </Link>
                    </FillButton>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </section>
        {/* Signature */}
        <section className="bg-background py-12 flex flex-col justify-center items-center my-8">
          <h1 className="font-sans text-4xl md:text-5xl xl:text-6xl font-bold leading-tight m-4">
            Our <span className="text-baseColor">Signature</span> Dishes
          </h1>
          <p className="text-body-sm font-sans font-regular">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the
          </p>
          <p className="text-body-sm font-sans font-regular">
            industry's standard dummy text ever since the 1500s
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-16">
            {dishes.map((dish, index) => (
              <MainCard
                key={index}
                image="src/assets/images/dish.png" // Replace with dynamic image if available
                itemName={dish.itemName}
                itemDescription={dish.itemDescription}
                itemPrice={dish.itemPrice}
                size={dish.size == "SMALL" ? 'S' : dish.size == "MEDIUM" ? 'M' : 'L'}
                category={dish.category}
                status={dish.status}
                onOrder={() => {
                  console.log("Order Now clicked for", dish.itemName);
                }}
              />
            ))}
          </div>
        </section>
        <section className="bg-white p-12 w-full">
          <div>
            <div className="">
              <Row gutter={[32, 32]}>
                {/* Contact Form */}
                <Col xs={24} md={12}>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Contact Us
                  </h2>
                  <Form form={form} layout="vertical" onFinish={onFinish}>
                    <Form.Item
                      name="name"
                      label="Name"
                      rules={[
                        { required: true, message: "Please enter your name" },
                      ]}
                    >
                      <Input placeholder="Your Name" />
                    </Form.Item>
                    <Form.Item
                      name="email"
                      label="Email"
                      rules={[
                        { required: true, message: "Please enter your email" },
                        {
                          type: "email",
                          message: "Please enter a valid email",
                        },
                      ]}
                    >
                      <Input placeholder="Your Email" />
                    </Form.Item>
                    <Form.Item
                      name="message"
                      label="Message"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your message",
                        },
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
                <Col
                  xs={24}
                  md={12}
                  className="flex flex-col justify-center w-full"
                >
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
          </div>
        </section>
      </div>
      <MyFooter />
    </>
  );
};

export default Home;
