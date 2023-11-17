import { Navigate, useLocation } from "react-router-dom";
import { userData } from "../hooks/getUserData";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function PrivateRoute({ children }: any) {
    {
        const user = userData()
        const location = useLocation();
        if (user && user.email) {
            return children;
        }
        return <Navigate to='/login' state={{ from: location }} replace></Navigate>
    }
}
