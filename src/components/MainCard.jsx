import React from "react";
import { useNavigate } from "react-router-dom";

const MainCard = ({
  image,
  itemName,
  itemDescription,
  itemPrice,
  size,
  category,
  status,
  onOrder,
}) => {
  const navigate = useNavigate();

  const handleOrderClick = () => {
    navigate("/taste");
    onOrder(); // Calling the onOrder function if any additional logic is required
  };

  return (
    <div className="relative flex w-72 h-[460px] items-center">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-36 w-36">
        <img
          src={image}
          alt={itemName}
          className="rounded-full object-cover w-full h-full"
        />
      </div>
      <div className="bg-navy_blue mt-10 w-full h-[380px] rounded-lg overflow-hidden shadow-lg">
        <div className="p-4 mt-20 text-center">
          <h2 className="text-white text-lg font-semibold mb-2">
            {itemName}
          </h2>
          <p className="text-blue text-xl font-bold mb-2">
            {itemPrice !== null ? `$${itemPrice.toFixed(2)}` : "Price not available"}
          </p>
          <p className="text-white text-xl m-2 w-24 h-8 text-balance text-center bg-base rounded-md">
            {size}
          </p>
          <p className="text-ash text-md float-end mb-2">
            {category}
          </p>
          <p className={`text-white text-sm mb-4 ${status === 'ACTIVE' ? 'text-green' : 'text-red'}`}>
            {status === "ACTIVE" ? "Available" : "Not Available"}
          </p>
          <p className="text-white text-sm mb-4">{itemDescription}</p>
        </div>
      </div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
        <button
          onClick={handleOrderClick}
          className="
          text-white
          bg-base
          rounded-full
          border
          border-base
          hover:bg-background
          hover:text-base
          focus:outline-none
          focus:ring-0.5
          focus:ring-base
          w-28 
          h-8
          ease-in-out
        "
        >
          <span className="font-regular">Order Now</span>
        </button>
      </div>
    </div>
  );
};

export default MainCard;
