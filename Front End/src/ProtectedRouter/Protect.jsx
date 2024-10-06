import React, { useEffect } from 'react';
import { useAuthStore } from '../Store/authStore';
import { Navigate } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';

const Protect = ({ children }) => {

    const { isAuthenticated, isCheckingAuth, checkAuth } = useAuthStore();

    useEffect(() => {
        if (!isAuthenticated) {
            checkAuth();
        }
    }, [checkAuth, isAuthenticated])

    if (isCheckingAuth) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                    <span className="visually-hidden"><FaSpinner className="w-6 h-6 animate-spin text-center mx-auto"></FaSpinner></span>
                </div>
            </div>
        );
    }
    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }

    return children;
}

export default Protect;
