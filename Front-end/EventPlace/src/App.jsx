import Header from "./components/Header";
import Home from "./pages/Home";

import Footer from "./components/Footer"
import AdminRolesManagement from "./pages/AdminRolesManagement";
import AdminCategoriesManagement from "./pages/AdminCategoriesManagement";

import { Route, Routes, Link } from "react-router-dom";
import { routes } from "./Routes";
import ProductDetail from "./pages/ProductDetail";
import './styles/app/App.css'
import AddProduct from "./pages/AddProduct";
import Login from "./pages/Login";
import TermsAndConditions from "./pages/TermsAndConditions";
import ResetPassword from "./pages/ResetPassword";
import ChangePassword from "./pages/ChangePassword";
import SignUp from "./pages/SignUp";
import React from "react";
import ProtectedRoutes from "./components/router/ProtectedRoutes";

import SendConfirmationEmailAgain from "./pages/SendConfirmationEmailAgain";
import EditEventPlace from "./pages/EditEventPlace";
import UserTable from "./components/UserTable";
import ChangeBasicToOwner from "./pages/ChangeBasicToOwner";
import Favorites from "./pages/Favorites";
import Cities from "./pages/Cities";
import AdminLocations from "./pages/AdminLocations";
import Booking from "./pages/Booking";
import ChatPage from "./pages/ChatPage";
import BookingError from "./pages/BookingError";
import BookingSucces from "./pages/BookingSucces";
import MercadoPagoPayment from "./pages/MercadoPagoPayment";
import AdminRolesList from "./pages/AdminRolesList";
import AdminRolesUpdate from "./pages/AdminRolesUpdate";
import BookingHistory from "./pages/BookingHistory";
import UserProfile from "./pages/UserProfile";

function App() {

  const currentRole = localStorage.getItem("userType");
  // console.log("user info!!!");
  // console.log(currentRole);


  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.productDetail} element={<ProductDetail />} />
        <Route path={routes.termsAndConditions} element={< TermsAndConditions />} />
        <Route path={routes.resetPassword} element={< ResetPassword />} />
        <Route exact path="/changePassword/:token" element={<ChangePassword />} />
        <Route exact path="/booking/:eventPlaceId/" element={<Booking/>} />
        <Route exact path={routes.bookingHistory} element={<BookingHistory/>} />
        <Route exact path="/chat/:senderId/:receiverId/:sender" element={<ChatPage/>} />
        <Route exact path="/payment/:preferenceId/" element={<MercadoPagoPayment/>} />
        <Route exact path="/bookingSucces/:eventPlaceId/:userId/:amountOfPeople/:startDate/:endDate/:services/:ownerName/:ownerId/:eventPlaceName" element={<BookingSucces/>} />
        <Route exact path={routes.bookingError} element={<BookingError/>} />
        <Route path={routes.login} element={< Login />} />
        <Route path={routes.userProfile} element={<UserProfile/>} />
        <Route path={routes.cities} element={<Cities />} />
        <Route exact path={routes.editEventPlace} element={<EditEventPlace />} />
        <Route exact path={routes.sendConfirmationAgain} element={<SendConfirmationEmailAgain />} />
        <Route exact path={routes.favorites} element={<Favorites />} />
        <Route
          path={routes.basicToOwner}
          element={
            <ProtectedRoutes currentRole={currentRole} allowedRoles={["BASIC"]}>
              <ChangeBasicToOwner />
            </ProtectedRoutes>
          } />



        <Route
          path={routes.addProduct}
          element={
            <ProtectedRoutes currentRole={currentRole} allowedRoles={["ADMIN", "OWNER"]}>
              <AddProduct />
            </ProtectedRoutes>
          } />

        <Route
          path={routes.login}
          element={
            <ProtectedRoutes currentRole={currentRole} allowedRoles={[null]}>
              <Login />
            </ProtectedRoutes>
          } />
        <Route
          path={routes.controlAdmin}
          element={
            <ProtectedRoutes currentRole={currentRole} allowedRoles={["ADMIN", "OWNER"]}>
              < AdminLocations />
            </ProtectedRoutes>
          }
        />

        <Route
          exact path="/changePassword/:token"
          element={
            <ProtectedRoutes currentRole={currentRole} allowedRoles={[null]}>
              < ChangePassword />
            </ProtectedRoutes>
          }
        />

        <Route
          path={routes.signUp}
          element={
            <ProtectedRoutes currentRole={currentRole} allowedRoles={[null]}>
              <SignUp />
            </ProtectedRoutes>
          } />

        <Route
          path={routes.adminRoles}
          element={
            <ProtectedRoutes currentRole={currentRole} allowedRoles={["ADMIN"]}>
              < AdminRolesManagement />
            </ProtectedRoutes>
          } />

        <Route
          path={routes.adminCategories}
          element={
            <ProtectedRoutes currentRole={currentRole} allowedRoles={["ADMIN"]}>
              < AdminCategoriesManagement />
            </ProtectedRoutes>
          } />
        <Route
          path={routes.editUsers}
          element={
            <ProtectedRoutes currentRole={currentRole} allowedRoles={["ADMIN"]}>
              <UserTable />
            </ProtectedRoutes>
          } />
          <Route
          path={routes.rolesList}
          element={
            <ProtectedRoutes currentRole={currentRole} allowedRoles={["ADMIN"]}>
             <AdminRolesList/>
            </ProtectedRoutes>
          } />
          <Route
          path={routes.rolesUpdate}
          element={
            <ProtectedRoutes currentRole={currentRole} allowedRoles={["ADMIN"]}>
             <AdminRolesUpdate/>
            </ProtectedRoutes>
          } />


      </Routes>
      <Footer />
      </div>
  )
}


export default App
