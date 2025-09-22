
import { createBrowserRouter, Outlet, RouterProvider, useLocation } from "react-router-dom"
import viVN from 'antd/es/locale/vi_VN';
import DashboardPage from "./pages/admin/dashboard.js";
import { ConfigProvider } from "antd";
import LayoutAdmin from "./pages/admin/layout.admin.js";
import RegistrationPage from "./pages/admin/Registration.js";
import LoginPage from "./pages/auth/login.js";
import ProtectedRoute from "./components/share/protected-route.ts/index.js";
import AuthenticationPage from "./pages/admin/Authentication.js";


export default function App() {



  const router = createBrowserRouter([
    {
      path: "/",
      element: (<LayoutAdmin />),
      children: [
        {
          index: true, element:
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>

        },
        {
          path: "registration",
          element:
            <ProtectedRoute>
              <RegistrationPage />
            </ProtectedRoute>
        },
        {
          path: "authentication",
          element:
            <ProtectedRoute>
              <AuthenticationPage />
            </ProtectedRoute>

        }
      ],
    },
    {
      path: "/login",
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
