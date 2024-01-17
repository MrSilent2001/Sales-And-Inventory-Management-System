import React from "react";
import "./inventoryLandingCard.css"

function inventoryLandingCard(props){
    return(
        <div className="inventoryLandingCard">
            <div>
                <div className="detailTopic">
                    <h1>{props.topic}</h1>
                </div>
                <div className="values">
                    <h1 style={{ color: props.textColor }}>{props.inventoryValues}</h1>
                </div>
            </div>
        </div>
    )
}

export default inventoryLandingCard;