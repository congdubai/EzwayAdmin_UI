
import { createBrowserRouter, Outlet, RouterProvider, useLocation } from "react-router-dom"
import viVN from 'antd/es/locale/vi_VN';
import DashboardPage from "./pages/admin/dashboard.js";
import { ConfigProvider } from "antd";
import LayoutAdmin from "./pages/admin/layout.admin.js";
import RegistrationPage from "./pages/admin/Registration.js";
import LoginPage from "./pages/auth/login.js";


export default function App() {



  const router = createBrowserRouter([
    {
      path: "/admin",
      element: (<LayoutAdmin />),
      children: [
        {
          index: true, element:
            <DashboardPage />
        }, {
          path: "Registration",
          element:
            <RegistrationPage />
        },
      ],
    },
    {
      path: "/",
      element: <LoginPage />,
    }
  ]);

  return (
    <>
      <ConfigProvider locale={viVN}>
        <RouterProvider router={router} />
      </ConfigProvider>

    </>

  )
}
