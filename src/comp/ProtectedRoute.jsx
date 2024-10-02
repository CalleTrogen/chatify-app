import { Navigate, Outlet } from 'react-router-dom';



const ProtectedRoute = () => (
    sessionStorage.getItem('jwt') ? (
        <Outlet />
    ) : (
        <Navigate to="/login" replace state={{ protectedRoute: true }} />
    )
);

export default ProtectedRoute;