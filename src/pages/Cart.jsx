import React from "react";
import Header from "../components/Header";
import MyFooter from "../components/MyFooter";
import { Slider, Select, Radio } from "antd";
import MainCard from "../components/MainCard";
import { Link } from "react-router-dom";

const { Option } = Select;

const Cart = () => {
  return (
    <>
      <section
        className="min-h-screen flex flex-col items-center justify-between bg-background w-full max-w-full"
        style={{ backgroundImage: `url("src/assets/images/bg.png")` }}
      >
        <Header />
      </section>
      <section className="bg-white py-12 flex flex-row w-full">
        {/* Filters Sidebar */}
        <div className="w-1/4 flex flex-col p-4 border-r border-gray-200">
          <h3 className="text-xl font-bold mb-6">Filters</h3>

          {/* Price Filter */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-2">Price</h4>
            <Slider
              range
              defaultValue={[20, 50]}
              min={0}
              max={100}
              tooltipVisible
            />
          </div>

          {/* Category Filter */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-2">Category</h4>
            <Select
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              placeholder="Select categories"
            >
              <Option value="pizza">Pizza</Option>
              <Option value="burger">Burger</Option>
              <Option value="friedrice">Fried Rice</Option>
              <Option value="kottu">Kottu</Option>
              <Option value="noodles">Noodles</Option>
            </Select>
          </div>

          {/* Size Filter */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-2">Size</h4>
            <Radio.Group defaultValue="medium">
              <Radio value="small">Small</Radio>
              <Radio value="medium">Medium</Radio>
              <Radio value="large">Large</Radio>
            </Radio.Group>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-3/4 p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-16">
            <MainCard
              image="src/assets/images/dish-1.png"
              name="Special Thai Spaghetti Noodle"
              price={20.0}
              availableDishes={20}
              description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
              onOrder={() => {
                <Link to="/taste">Taste</Link>;
              }}
            />
            <MainCard
              image="src/assets/images/dish-1.png"
              name="Special Thai Spaghetti Noodle"
              price={20.0}
              availableDishes={20}
              description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
              onOrder={() => {
                <Link to="/taste">Taste</Link>;
              }}
            />
            <MainCard
              image="src/assets/images/dish-1.png"
              name="Special Thai Spaghetti Noodle"
              price={20.0}
              availableDishes={20}
              description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
              onOrder={() => {
                <Link to="/taste">Taste</Link>;
              }}
            />
            <MainCard
              image="src/assets/images/dish-1.png"
              name="Special Thai Spaghetti Noodle"
              price={20.0}
              availableDishes={20}
              description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
              onOrder={() => {
                <Link to="/taste">Taste</Link>;
              }}
            />
            <MainCard
              image="src/assets/images/dish-1.png"
              name="Special Thai Spaghetti Noodle"
              price={20.0}
              availableDishes={20}
              description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
              onOrder={() => {
                <Link to="/taste">Taste</Link>;
              }}
            />
            <MainCard
              image="src/assets/images/dish-1.png"
              name="Special Thai Spaghetti Noodle"
              price={20.0}
              availableDishes={20}
              description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
              onOrder={() => {
                <Link to="/taste">Taste</Link>;
              }}
            />
            <MainCard
              image="src/assets/images/dish-1.png"
              name="Special Thai Spaghetti Noodle"
              price={20.0}
              availableDishes={20}
              description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
              onOrder={() => {
                <Link to="/taste">Taste</Link>;
              }}
            />
            <MainCard
              image="src/assets/images/dish-1.png"
              name="Special Thai Spaghetti Noodle"
              price={20.0}
              availableDishes={20}
              description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
              onOrder={() => {
                <Link to="/taste">Taste</Link>;
              }}
            />
          </div>
        </div>
      </section>
      <MyFooter />
    </>
  );
};

export default Cart;
