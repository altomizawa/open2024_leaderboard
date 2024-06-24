import { Outlet, Navigate } from 'react-router-dom'


export default function ProtectedRoute(props) {
    const {isLoggedIn} = props;
    return (
        isLoggedIn ? <Outlet /> : <Navigate to='/' />
    )
}