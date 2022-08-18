import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { getToken } from '../services/authService'

function ProtectedComponent({ component: Component, ...props }) {
    const token = getToken();
    const location = useLocation();

    return (
        <>
            {
                !token ?
                    <Navigate to="/login"
                        state={{ from: location }}
                        replace
                    />
                    :
                    <Component {...props} />
            }
        </>
    );

}

export default ProtectedComponent