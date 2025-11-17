import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import CustomerLayout from "./layouts/CustomerLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import MyOrders from "./pages/MyOrders";
import OrderDetail from "./pages/OrderDetail";

import AdminLogin from "./admin/AdminLogin";
import AdminLayout from "./admin/AdminLayout";

import Dashboard from "./admin/pages/Dashboard";
import ProductsList from "./admin/pages/ProductsList";
import AddProduct from "./admin/pages/AddProduct";
import Orders from "./admin/pages/Orders";
import DeliveryPartners from "./admin/pages/DeliveryPartners";
import LiveStatuses from "./admin/pages/LiveStatuses";

function App() {
  const { user, logout } = useContext(AuthContext);

  return (
    <BrowserRouter>
      {/* <Navbar loggedIn={!!user} onLogout={logout} />   */}

      <Routes>
        <Route path="/login" element={<CustomerLayout><Login /></CustomerLayout>} />
        <Route path="/register" element={<CustomerLayout><Register /></CustomerLayout>} />
        <Route path="/products" element={<CustomerLayout><Products /></CustomerLayout>} />
        <Route path="/products/:id" element={<CustomerLayout><ProductDetail /></CustomerLayout>} />

        <Route path="/orders" element={<CustomerLayout><MyOrders /></CustomerLayout>} />
        <Route path="/orders/:id" element={<CustomerLayout><OrderDetail /></CustomerLayout>} />


        <Route path="/admin/login" element={<AdminLogin />} />

        <Route path="/admin/dashboard" element={<AdminLayout><Dashboard /></AdminLayout>} />
        <Route path="/admin/products" element={<AdminLayout><Products /></AdminLayout>} />
        <Route path="/admin/add-product" element={<AdminLayout><AddProduct /></AdminLayout>} />
        <Route path="/admin/orders" element={<AdminLayout><Orders /></AdminLayout>} />
        <Route path="/admin/delivery-partners" element={<AdminLayout><DeliveryPartners /></AdminLayout>} />
        <Route path="/admin/live-status" element={<AdminLayout><LiveStatuses /></AdminLayout>} />

        <Route path="*" element={<CustomerLayout><Products /></CustomerLayout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
