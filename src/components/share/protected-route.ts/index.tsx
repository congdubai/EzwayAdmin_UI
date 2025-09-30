import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import { store } from "@/redux/store";
import { setRefreshTokenAction } from "@/redux/slice/accountSlide";
import { jwtDecode } from "jwt-decode";

interface JWTPayload {
    exp: number;
}

const isTokenValid = (token: string | undefined): boolean => {
    if (!token) return false;
    try {
        const decoded: JWTPayload = jwtDecode(token);
        return decoded.exp * 1000 > Date.now(); // exp (giây) -> Date.now() (ms)
    } catch {
        return false;
    }
};

interface RoleBaseRouteProps {
    children: React.ReactNode;
    allowedRoles?: string[];
}

// Route kiểm tra role
const RoleBaseRoute = ({ children, allowedRoles }: RoleBaseRouteProps) => {
    const account = useAppSelector((state) => state.account.account);
    const role = account?.role;

    if (!role) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
        return <Navigate to="/403" replace />; // redirect sang trang lỗi 403
    }

    return <>{children}</>;
};

// Route bảo vệ chung
const ProtectedRoute = ({
    children,
    allowedRoles,
}: {
    children: React.ReactNode;
    allowedRoles?: string[];
}) => {
    const isAuthenticated = useAppSelector(
        (state) => state.account.isAuthenticated
    );

    // 👉 Lấy token từ localStorage
    const accountStr = localStorage.getItem("account");
    const account = accountStr ? JSON.parse(accountStr) : null;
    const token: string | undefined = account?.accessToken;
    const valid = isTokenValid(token);

    // Debug
    console.log("Auth:", isAuthenticated, "Token:", token, "Valid:", valid);

    if (!isAuthenticated || !valid) {
        // clear Redux khi token hết hạn
        store.dispatch(
            setRefreshTokenAction({
                status: true,
                message: "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại.",
            })
        );
        localStorage.removeItem("account");
        return <Navigate to="/login" replace />;
    }

    return (
        <RoleBaseRoute allowedRoles={allowedRoles}>{children}</RoleBaseRoute>
    );
};

export default ProtectedRoute;
