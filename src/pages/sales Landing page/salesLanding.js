import React from "react";
import "./salesLanding.css"
import InventoryLandingCard from "../../components/inventoryLandingCard/inventoryLandingCard";

function SalesLanding(){

    //There should be a useEffect hook for display the inventory values in the component

    return(
        <div className="salesLandingOuter">
            <div className="salesLandingInner">
                <div className="cardRow">
                    <div className="salesLandingCard">
                        <h5 className = "timeline">November</h5>
                        <InventoryLandingCard
                            topic="Total Sales" inventoryValues="Rs.6,512,890.12" textColor="#FF0000">

                        </InventoryLandingCard>
                    </div>
                    <div className="landingCard">
                        <h5 className = "timeline">Today</h5>
                        <InventoryLandingCard
                            topic="Pending Orders" inventoryValues="11" textColor="#FF0000">
                        </InventoryLandingCard>
                    </div>
                </div>
                <div className="cardRow">
                
                    <div className="landingCard secondCardRow">
                        <h5 className = "timeline">November</h5>
                        <InventoryLandingCard
                            topic="Total Earnings" inventoryValues="Rs.4,105,918.80" textColor="#FF0000">
                        </InventoryLandingCard>
                    </div>
                    <div className="landingCard secondCardRow">
                    <h5 className = "timeline">November</h5>
                        <InventoryLandingCard
                            topic="Total Orders" inventoryValues="112" textColor="#FF00000">
                        </InventoryLandingCard>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SalesLanding;