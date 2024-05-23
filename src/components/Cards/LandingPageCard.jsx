import React from "react";

function landingPageCard(props){
    return(
        <div className="inventoryLandingCard" style={{width:'24.563em', height:'10.5em', backgroundColor:'#ffffff', borderRadius: '1.313em', boxShadow:'0 4px 8px rgba(0, 0, 0, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div>
                <div className="detailTopic">
                    <h2>{props.topic}</h2>
                </div>
                <div className="values">
                    <h2 style={{ color: props.textColor }}>{props.inventoryValues}</h2>
                </div>
            </div>
        </div>
    )
}

export default landingPageCard;