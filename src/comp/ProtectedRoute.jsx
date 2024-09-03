import { Navigate, Outlet } from 'react-router-dom';



const ProtectedRoute = () => (
    /* TODO: Ändra så vi kollar på local-/sessionStorage för JWTn
       du skapar ju din login funktion och där i måste du sätta typ:
       sessionStorage.setItem('jwt', data.token)
    */
    sessionStorage.getItem('jwt') ? (
        <Outlet />
    ) : (
        <Navigate to="/login" replace state={{ protectedRoute: true }} />
    )
);

export default ProtectedRoute;