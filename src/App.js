import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import Navbar from "./components/Navbar";
import { AuthContext } from "./context/AuthContext";

import Login from "./pages/Login";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import MyOrders from "./pages/MyOrders";
import OrderDetail from "./pages/OrderDetail";

function App() {
  const { user, logout } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Navbar loggedIn={!!user} onLogout={logout} />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />

        <Route path="/orders" element={<MyOrders />} />
        <Route path="/orders/:id" element={<OrderDetail />} />

        <Route path="*" element={<Products />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
