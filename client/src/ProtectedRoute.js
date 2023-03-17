import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { UserContext } from './UserContext';

const ProtectedRoute = ({children}) => {
        const data = useContext(UserContext);
        
        const isAuth = data.auth;
        return isAuth ? children : <Navigate to = '/login' />

}

export default ProtectedRoute