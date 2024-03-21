import React from "react";
import "./inventoryLandingCard.css"

function inventoryLandingCard(props){
    return(
        <div className="inventoryLandingCard">
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

export default inventoryLandingCard;