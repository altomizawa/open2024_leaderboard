import { Outlet, Navigate } from 'react-router-dom'
import { useContext } from 'react'


export default function ProtectedRoute(props) {
    const {isLoggedIn} = props;
    return (
        isLoggedIn ? <Outlet /> : <Navigate to='/' />
    )
}