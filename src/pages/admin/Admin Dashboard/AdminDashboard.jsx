import React, { useState } from 'react';
import './AdminDashboard.css';
import Header from '../../../layout/adminPanel/header';
import Sidebar from '../../../layout/adminPanel/sidebar';
import Home from '../../../layout/adminPanel/home';
import AdminProfile from "./Profile/adminProfile";
import { Modal } from "@mui/material"; // import the modal component

function AdminDashboard() {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle);
    };

    const openProfileModal = () => {
        setShowProfileModal(true);
    };

    const closeProfileModal = () => {
        setShowProfileModal(false);
    };

    return (
        <div className='grid-container'>
            <Header OpenSidebar={OpenSidebar}/>
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} openProfileModal={openProfileModal}/>
            <Home />
            <Modal open={showProfileModal} onClose={closeProfileModal}>
                <AdminProfile show={showProfileModal} onClose={closeProfileModal} />
            </Modal>
        </div>
    );
}

export default AdminDashboard;
