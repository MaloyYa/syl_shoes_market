import { Navigate, useLocation } from 'react-router';
import { useAuthStore } from '../modules/auth/useAuthStore';

export const ProtectedRoute = ({ children }) => {
    const isAuth = useAuthStore((state) => state.isAuth);
    const location = useLocation();

    if (!isAuth) {
        return (
            <Navigate
                to="/"
                state={{ from: location }}
                replace
            />
        );
    }

    return children;
};
