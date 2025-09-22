import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";

const RoleBaseRoute = (props: any) => {
    const account = useAppSelector(state => state.account.account);
    const Role = account?.role;

    if (Role && Role !== "NORMAL_USER") {
        return <>{props.children}</>;
    } else {
        return <Navigate to="/login" replace />;
    }
};

const ProtectedRoute = (props: any) => {
    const isAuthenticated = useAppSelector(state => state.account.isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <RoleBaseRoute>{props.children}</RoleBaseRoute>;
};

export default ProtectedRoute;
