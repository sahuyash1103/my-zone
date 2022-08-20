import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { getToken } from '../services/authService'

function ProtectedComponent(props) {
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
                    props.children
            }
        </>
    );
}

export default ProtectedComponent