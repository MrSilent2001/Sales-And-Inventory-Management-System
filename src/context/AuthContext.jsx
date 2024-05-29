import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({ token: null, user: null });
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            setAuthState({ ...authState, token });
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    const customerLogin = async (username, password) => {
        const response = await axios.post('http://localhost:9000/auth/customer/login', { username, password});
        const { access_token, id, role} = response.data;
        setAuthState({ token: access_token, id, role});
        setIsAuthenticated(true);

        // Store tokens in localStorage
        localStorage.setItem('accessToken', access_token);
        localStorage.setItem('role', role);
        localStorage.setItem('id', id);

        return { id, role, access_token };
    };

    const supplierLogin = async (username, password) => {
        const response = await axios.post('http://localhost:9000/auth/supplier/login', { username, password});
        const { access_token, id, role} = response.data;
        setAuthState({ token: access_token, id, role});
        setIsAuthenticated(true);

        // Store tokens in localStorage
        localStorage.setItem('accessToken', access_token);
        localStorage.setItem('role', role);
        localStorage.setItem('id', id);

        return { id, role, access_token };
    };

    const adminLogin = async (username, password) => {
        const response = await axios.post('http://localhost:9000/auth/admin/login', { username, password });
        const { access_token, id, role} = response.data;
        setAuthState({ token: access_token, id, role});
        setIsAuthenticated(true);

        // Store tokens in localStorage
        localStorage.setItem('accessToken', access_token);
        localStorage.setItem('role', role);
        localStorage.setItem('id', id);

        return { id, role, access_token };
    };

    const logout = () => {
        setAuthState({ token: null, user: null });
        setIsAuthenticated(false);
        localStorage.clear();
    };

    return (
        <AuthContext.Provider value={{ authState, isAuthenticated, loading, adminLogin, customerLogin, supplierLogin, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
