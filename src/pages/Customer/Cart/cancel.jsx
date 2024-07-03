import React, {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
import CustomizedButton from "../../../components/Button/button";


const Cancel = () => {
    const [navigate, setNavigate] = useState(false);

    useEffect(() => {
        // Load the Lottie player script
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs';
        script.type = 'module';
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);
    const handleRedirect = () => {
        setNavigate(true);
    }

    if (navigate) {
        return <Navigate to="/cart"/>
    }
    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor:'#ddd7f8'
        }}>

            <dotlottie-player src="https://lottie.host/91d50e87-b3ec-4703-9c77-745e89535366/yV3uIihmzw.json"
                              background="transparent" speed="1"
                              style={{width: '200px', height: '200px', marginTop: '-5em'}}
                              loop autoplay>
            </dotlottie-player>

            <div>
                <h1>Payment Unsuccessful</h1>
                <h2>Your payment was cancelled.</h2>
            </div>

            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
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

}
export default Cancel;
