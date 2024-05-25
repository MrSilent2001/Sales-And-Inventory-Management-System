import React, {useState} from "react";
import {Navigate} from "react-router-dom";

const Cancel = () => {
    const [navigate, setNavigate] = useState(false);
    const handleRedirect = ()=>{
        localStorage.setItem("cart", []);
        setNavigate(true);
    }

    if(navigate){
        return <Navigate to="/cart"/>
    }
    return (
        <div>
            <h1>Cancel</h1>
            <h2>Your payment was canceled.</h2>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CustomizedButton
                    hoverBackgroundColor="#0aaf0b"
                    style={{
                        color: '#ffffff',
                        backgroundColor: '#057007',
                        width: '7.5em',
                        height: '2.25em',
                        fontSize: '0.85em',
                        padding: '0.5em 0.625em',
                        borderRadius: '0.625em',
                        border: 'none',
                        marginTop: '0.25em',
                        marginBottom: '2em',
                    }}
                    onClick={handleRedirect}
                >
                    Go Back
                </CustomizedButton>

            </div>
        </div>
    );
};

export default Cancel;
