import React, { useState } from 'react';
import SignUp from '../login & SignUp/SignUp/signup';
import Login from '../login & SignUp/login/login';

function Auth() {
    const [activeTab, setActiveTab] = useState('login'); // 'login', 'signup-customer', 'signup-supplier'

    const handleTabSwitch = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div>
            {activeTab === 'login' && <Login onTabSwitch={handleTabSwitch} />}
            {activeTab === 'signup-customer' && <SignUp onTabSwitch={handleTabSwitch} initialTab="customer" />}
            {activeTab === 'signup-supplier' && <SignUp onTabSwitch={handleTabSwitch} initialTab="supplier" />}
        </div>
    );
}

export default Auth;
