import { Navigate, useLocation } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function PrivateRoute({ children }: any) {
    {
        const userData = sessionStorage.getItem('userData');
        const user = JSON.parse(userData as string);
        const location = useLocation();
        if (user && user.email) {
            return children;
        }
        return <Navigate to='/login' state={{ from: location }} replace></Navigate>
    }
}
