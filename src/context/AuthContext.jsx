import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        token: null,
        id: null,
        role: null,
    });
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const role = localStorage.getItem('role');
        const id = localStorage.getItem('id');

        if (token && role && id) {
            setAuthState({ token, role, id });
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    const customerLogin = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:9000/auth/customer/login', { username, password });
            const { access_token, id, role } = response.data;
            setAuthState({ token: access_token, id, role });
            setIsAuthenticated(true);

            localStorage.setItem('accessToken', access_token);
            localStorage.setItem('role', role);
            localStorage.setItem('id', id);

            return { id, role, access_token };
        } catch (error) {
            console.error('Customer login failed:', error);
            throw error;
        }
    };

    const supplierLogin = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:9000/auth/supplier/login', { username, password });
            const { access_token, id, role } = response.data;
            setAuthState({ token: access_token, id, role });
            setIsAuthenticated(true);

            localStorage.setItem('accessToken', access_token);
            localStorage.setItem('role', role);
            localStorage.setItem('id', id);

            return { id, role, access_token };
        } catch (error) {
            console.error('Supplier login failed:', error);
            throw error;
        }
    };

    const adminLogin = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:9000/auth/admin/login', { username, password });
            const { access_token, id, role } = response.data;
            setAuthState({ token: access_token, id, role });
            setIsAuthenticated(true);

            localStorage.setItem('accessToken', access_token);
            localStorage.setItem('role', role);
            localStorage.setItem('id', id);

            return { id, role, access_token };
        } catch (error) {
            console.error('Admin login failed:', error);
            throw error;
        }
    };

    const logout = () => {
        setAuthState({ token: null, id: null, role: null });
        setIsAuthenticated(false);
        localStorage.clear();
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AuthContext.Provider value={{ authState, isAuthenticated, loading, adminLogin, customerLogin, supplierLogin, logout }}>
            {children}
        </AuthContext.Provider>
        </LocalizationProvider>
    );
};

export const useAuth = () => useContext(AuthContext);
