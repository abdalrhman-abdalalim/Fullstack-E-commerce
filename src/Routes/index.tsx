import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Products from "../pages/Products";
import RootLayout from "../pages/RootLayout";
import Home from "../pages/Home";
import CardDetails from "../components/CardDetails";
import Login from "../pages/Login";
import CookiesService from "../services/CookiesService";
import DashboardLayout from "../pages/Dashboard/DashboardLayout";
import DashboardProductsTable from "../components/DashboardProductsTable";
import IndexDashboard from "../pages/Dashboard/IndexDashboard";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<CardDetails />} />
      </Route>
      <Route
        path="login"
        element={<Login isAuthenticated={CookiesService.get("jwt")} />}
      />

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<IndexDashboard />} />
        <Route path="/dashboard/products" element={<DashboardProductsTable/>} />
        <Route path="/dashboard/categories" element={<h1>hello from categories</h1>} />
      </Route>
    </>
  )
);

export default router;
