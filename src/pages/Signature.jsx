import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import MyFooter from "../components/MyFooter";
import { Link } from "react-router-dom";
import MainCard from "../components/MainCard";
import axios from "axios";

const Signature = () => {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    const fetchFavoriteItems = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/item/favorite-items");
        if (response.data.statusCode === 200) {
          setDishes(response.data.data);
        } else {
          console.error("Failed to fetch items:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching favorite items:", error);
      }
    };

    fetchFavoriteItems();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <section className="bg-background py-12 flex flex-col justify-center items-center my-8">
        <h1 className="font-sans text-4xl md:text-5xl xl:text-6xl font-bold leading-tight m-4">
          Our <span className="text-base text-4xl md:text-5xl xl:text-6xl">Signature</span> Dishes
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
      </section>
      <MyFooter />
    </div>
  );
};

export default Signature;
