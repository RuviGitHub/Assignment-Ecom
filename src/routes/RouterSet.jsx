import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import OrderHistory from "../pages/OrderHistory";
import Inquiry from "../pages/Inquiry";
import Reservation from "../pages/Reservation";
import Taste from "../pages/Taste";
import Cart from "../pages/Cart";
import Signature from "../pages/Signature";
import ContactUs from "../pages/ContactUs";

const RouterSet = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signature" element={<Signature />} />
      <Route path="/taste" element={<Taste />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/reservations" element={<Reservation />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/order-history" element={<OrderHistory />} />
      <Route path="/inquiry" element={<Inquiry />} />
      <Route path="/contact" element={<ContactUs />} />
    </Routes>
  );
};

export default RouterSet;
