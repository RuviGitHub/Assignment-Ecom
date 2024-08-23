import React, { useState } from "react";
import Header from "../components/Header";
import MyFooter from "../components/MyFooter";
import { Button, Input, Checkbox } from "antd";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const CartItem = ({ item, onUpdateQuantity, onRemove, onToggleTopping }) => (
  <div className="bg-base p-2 rounded-lg shadow-md mb-4 flex items-center">
    <img
      src="src/assets/images/dish.png"
      alt={item.name}
      className="w-20 h-20 object-cover rounded-full mr-4"
    />
    <div className="flex-grow">
      <h3 className="text-lg font-semibold">{item.name}</h3>
      <p className="text-sm text-gray-600">{item.description}</p>
      <p className="text-lg font-bold mt-1">${item.price}</p>
    </div>
    <div className="flex items-center mt-2 mr-4">
      <Button
        icon={<Minus size={16} />}
        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
        className="border-gray-300 text-gray-600"
      />
      <span className="mx-2 text-lg">{item.quantity}</span>
      <Button
        icon={<Plus size={16} />}
        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
        className="border-gray-300 text-gray-600"
      />
    </div>
    <Checkbox
      checked={item.extraTopping}
      onChange={(e) => onToggleTopping(item.id, e.target.checked)}
      className="mr-4"
    >
      Add Extra Topping
    </Checkbox>
    <div
      className={`w-8 h-8 rounded-full flex items-center justify-center ${
        item.selected ? "bg-blue-100" : "bg-gray-200"
      }`}
    >
      <div
        className={`w-4 h-4 rounded-full ${
          item.selected ? "bg-blue-500" : "bg-gray-400"
        }`}
      ></div>
    </div>
  </div>
);

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Margarita",
      description: "Large | Cheese, onion, and tomato pure",
      price: 50,
      quantity: 1,
      image: "src/assets/images/pizza.png",
      extraTopping: false,
      selected: true,
    },
    {
      id: 2,
      name: "Tandoori",
      description: "Large | Cheese, onion, and tomato pure",
      price: 25,
      quantity: 1,
      image: "src/assets/images/pizza.png",
      extraTopping: false,
      selected: true,
    },
    // Add more items as needed
  ]);

  const updateQuantity = (id, newQuantity) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const toggleTopping = (id, checked) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, extraTopping: checked } : item
      )
    );
  };

  const totalItems = cartItems.filter((item) => item.selected).length;
  const totalPrice = cartItems.reduce(
    (sum, item) => (item.selected ? sum + item.price * item.quantity : sum),
    0
  );

  return (
    <>
      <Header />

      <section className="bg-white py-12 flex flex-row w-full">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-3/5">
              <h2 className="text-2xl font-bold mb-4">Cart</h2>
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                  onToggleTopping={toggleTopping}
                />
              ))}
              <div className="mt-4">
                <span className="font-semibold">{totalItems} Items</span>
                <span className="float-right font-semibold">
                  {totalPrice.toFixed(2)} USD
                </span>
              </div>
            </div>
            <div className="w-full md:w-2/5">
              <h2 className="text-2xl font-bold mb-4">Checkout</h2>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-2">Billing Address</h3>
                <Input placeholder="Address line 01" className="mb-2" />
                <Input placeholder="Address line 02" className="mb-2" />
                <Input placeholder="Country" className="mb-4" />

                <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
                <Input placeholder="Address line 01" className="mb-2" />
                <Input placeholder="Address line 02" className="mb-2" />
                <Input placeholder="Country" className="mb-4" />

                <h3 className="text-lg font-semibold mb-2">Card Details</h3>
                <Input placeholder="Card name" className="mb-2" />
                <Input placeholder="Card holder" className="mb-2" />
                <div className="flex gap-2 mb-4">
                  <Input placeholder="Exp Date" style={{ width: "50%" }} />
                  <Input placeholder="CVV" style={{ width: "50%" }} />
                </div>

                <div className="flex justify-between mt-6">
                  <Button size="large">Cancel</Button>
                  <Button
                    type="primary"
                    size="large"
                    className="bg-red-500 hover:bg-red-600"
                  >
                    Pay Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <MyFooter />
    </>
  );
};

export default Cart;
