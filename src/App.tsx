
import { createBrowserRouter, Outlet, RouterProvider, useLocation } from "react-router-dom"
import viVN from 'antd/es/locale/vi_VN';
import DashboardPage from "./pages/dashboard.tsx";
import LayoutAdmin from "./pages/layout.admin.tsx";
import { ConfigProvider } from "antd";
import RegistrationPage from "./pages/Registration.tsx";


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

  ]);

  return (
    <>
      <ConfigProvider locale={viVN}>
        <RouterProvider router={router} />
      </ConfigProvider>

    </>

  )
}
