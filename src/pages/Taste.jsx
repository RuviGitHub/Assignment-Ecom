import React, { useState, useEffect } from "react";
import { Input, Slider, Select, Radio, Pagination } from "antd";
import MainCard from "../components/MainCard";
import Header from "../components/Header";
import MyFooter from "../components/MyFooter";
import axios from "axios";

const { Option } = Select;

const Taste = () => {
  const [dishes, setDishes] = useState([]);
  const [filteredDishes, setFilteredDishes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("NOODLES");
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, 100]);
  const [selectedSize, setSelectedSize] = useState("SMALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8); // Number of items per page

  const fetchFilteredItems = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/item/all-items", {
        params: {
          minPrice: selectedPriceRange[0],
          maxPrice: selectedPriceRange[1],
          sizeFilter: selectedSize.toUpperCase(),
          categoryFilter: selectedCategory.toUpperCase(),
        },
      });

      if (response.data.statusCode === 200) {
        console.log(response.data.data);
        setDishes(response.data.data);
      } else {
        console.error("Failed to fetch items:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching filtered items:", error);
    }
  };

  useEffect(() => {
    fetchFilteredItems();
  }, [selectedPriceRange, selectedSize, selectedCategory]);

  useEffect(() => {
    // Pagination logic
    const totalDishes = dishes.length;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setFilteredDishes(dishes.slice(startIndex, endIndex));
  }, [dishes, currentPage]);

  return (
    <>
      <section className="min-h-screen flex flex-col items-center justify-between bg-background w-full max-w-full ">
        <Header />

        <section className="bg-white p-12 flex flex-row w-full">
          {/* Filters Sidebar */}
          <div className="w-1/4 flex flex-col p-4 border-r border-gray-200">
            <h3 className="text-xl font-bold mb-6">Filters</h3>

            {/* Price Filter */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-2">Price</h4>
              <Slider
                range
                value={selectedPriceRange}
                onChange={(value) => setSelectedPriceRange(value)}
                min={0}
                max={100}
                tooltipVisible
              />
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-2">Category</h4>
              <Select
                value={selectedCategory}
                onChange={(value) => setSelectedCategory(value)}
                style={{ width: "100%" }}
                placeholder="Select a category"
              >
                <Option value="PIZZA">Pizza</Option>
                <Option value="BURGER">Burger</Option>
                <Option value="FRIED_RICE">Fried Rice</Option>
                <Option value="KOTTU">Kottu</Option>
                <Option value="NOODLES">Noodles</Option>
              </Select>
            </div>

            {/* Size Filter */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-2">Size</h4>
              <Radio.Group
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value.toUpperCase())}
              >
                <Radio value="SMALL">Small</Radio>
                <Radio value="MEDIUM">Medium</Radio>
                <Radio value="LARGE">Large</Radio>
              </Radio.Group>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-3/4 p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-16">
              {filteredDishes.map((dish) => (
                <MainCard
                  key={dish.id}
                  image="src/assets/images/dish.png" // Hardcoded image for now
                  itemName={dish.itemName}
                  itemPrice={dish.itemPrice}
                  itemDescription={dish.itemDescription}
                  size={dish.size}
                  category={dish.category}
                  status={dish.status}
                  onOrder={() => {
                    console.log("Order Now clicked for", dish.itemName);
                  }}
                />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={dishes.length}
              onChange={(page) => setCurrentPage(page)}
              className="mt-8"
            />
          </div>
        </section>
      </section>
      <MyFooter />
    </>
  );
};

export default Taste;
