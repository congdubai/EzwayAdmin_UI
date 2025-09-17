
import { createBrowserRouter, Outlet, RouterProvider, useLocation } from "react-router-dom"
import viVN from 'antd/es/locale/vi_VN';
import DashboardPage from "./pages/dashboard.tsx";
import LayoutAdmin from "./pages/layout.admin.tsx";
import { ConfigProvider } from "antd";
import RegisterPage from "./pages/Register.tsx";


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
          path: "register",
          element:
            <RegisterPage />
        },
      ],
    },

  ]);

  return (
    <>
      <ConfigProvider locale={viVN}>
        <RouterProvider router={router} />
      </ConfigProvider>

    </>

  )
}
