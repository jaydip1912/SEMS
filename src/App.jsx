import { Navigate, Route, Router, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Auth/Login";
import Layout from "./common/Layout";
import Home from "./components/Dashboard/Home";
import Enquiry from "./components/Enquiry/Enquiry";
import EnquiryForm from "./components/Enquiry/EnquiryForm";
import Profile from "./components/Profile/Profile";
import ChangePassword from "./components/Profile/ChangePassword";
import CustomerList from "./components/Customer/CustomerList";
import CustomerForm from "./components/Customer/CustomerForm";
import UserList from "./components/AdminUser/UserList";
import UserForm from "./components/AdminUser/UserForm";
import Roles from "./components/Role/Roles";
import SalesPersonList from "./components/SalesPerson/SalesPersonList";
import SalesPersonForm from "./components/SalesPerson/SalesPersonForm";
import ProductList from "./components/Products/ProductList";
import ProductForm from "./components/Products/ProductForm";
import CoverLetterList from "./components/CoverLetter/CoverLetterList";
import CoverLetterForm from "./components/CoverLetter/CoverLetterForm";
import ErrorBoundary from "./components/ErrorBoundary";
import { Suspense } from "react";

function App() {
  return (
    <>
      <Suspense>
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* After Login */}
          <Route path="/" element={<Layout />}>
            {/* <Route path="/dashboard" element={<Home />} /> */}
            <Route path="/" element={<Enquiry />} />
            <Route path="/enquiry" element={<Enquiry />} />
            <Route path="/enquiry/createEnquiry" element={<EnquiryForm />} />
            <Route
              path="/enquiry/updateEnquiry/:inquiry_id"
              element={<EnquiryForm isEdit={true} />}
            />

            <Route path="/profile" element={<Profile />} />
            <Route path="/changePassword" element={<ChangePassword />} />

            {/* Customer */}
            <Route path="/customers" element={<CustomerList />} />
            <Route
              path="/customers/createCustomer"
              element={<CustomerForm isEdit={false} />}
            />
            <Route
              path="/customers/updateCustomer/:userId"
              element={<CustomerForm isEdit={true} />}
            />

            {/* Users */}
            <Route path="/userList" element={<UserList />} />
            <Route
              path="/userList/createUser"
              element={<UserForm isEdit={false} />}
            />
            <Route
              path="/userList/updateUser/:userId"
              element={<UserForm isEdit={true} />}
            />

            {/* Roles */}
            <Route path="/roles" element={<Roles />} />

            {/* Sales Person */}
            <Route path="/salesperson" element={<SalesPersonList />} />
            <Route
              path="/salesperson/createSalesPerson"
              element={<SalesPersonForm isEdit={false} />}
            />
            <Route
              path="/salesperson/updateSalesPerson/:userId"
              element={<SalesPersonForm isEdit={true} />}
            />

            {/* Products */}
            <Route path="/products" element={<ProductList />} />
            <Route
              path="/products/createProduct"
              element={<ProductForm isEdit={false} />}
            />
            <Route
              path="/products/updateProduct/:userId"
              element={<ProductForm isEdit={true} />}
            />

            {/* Cover Letter */}
            <Route path="/coverLetter" element={<CoverLetterList />} />
            <Route
              path="/coverLetter/createCoverLetter"
              element={<CoverLetterForm isEdit={false} />}
            />
            <Route
              path="/coverLetter/updateCoverLetter/:userId"
              element={<CoverLetterForm isEdit={true} />}
            />
          </Route>

          {/* Other Routes */}
          <Route path="*" element={<Navigate to={"/login"} />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
