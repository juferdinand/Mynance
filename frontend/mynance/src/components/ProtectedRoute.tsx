import React from 'react';
import {Outlet, Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import {jwtDecode} from "jwt-decode";

const ProtectedRoute = () => {
    const [cookies] = useCookies(['access']);
    const isExpired = isTokenExpired(cookies.access);

    if (isExpired) {
        return <Navigate to="/" />;
    }
    return <Outlet />;
}

const isTokenExpired = (token:string) => {
    try {
        const decoded = jwtDecode(token);
        const currentDate = new Date();

        //check if  no expiration date is set
        if (typeof decoded.exp === 'undefined') {
            return true;
        }

        // JWT exp is in seconds
        return decoded.exp * 1000 < currentDate.getTime();
    } catch (error) {
        // if there is an error, the token is invalid
        return true;
    }
};

export default ProtectedRoute;