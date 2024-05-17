//import React from "react";
// import "./inventoryLanding.css"
// import InventoryLandingCard from "../../../../components/Cards/LandingPageCard";
// import InventoryNavbar from "../../../../layout/navbar/Inventory navbar/Inventory navbar";
// import Footer from "../../../../layout/footer/footer";
//
// function InventoryLanding(){
//
//     //There should be a useEffect hook for display the inventory values in the component
//
//     return(
//         <>
//             <InventoryNavbar/>
//
//             <div className="inventoryLandingOuter">
//                 <div className="inventoryLandingInner">
//                     <div className="cardRow">
//                         <div className="landingCard">
//                             <InventoryLandingCard
//                                 topic="All Item Categories" inventoryValues="25" textColor="#3F72AF">
//                             </InventoryLandingCard>
//                         </div>
//                         <div className="landingCard">
//                             <InventoryLandingCard
//                                 topic="All Items" inventoryValues="125" textColor="#E74646">
//                             </InventoryLandingCard>
//                         </div>
//                     </div>
//                     <div className="cardRow">
//                         <div className="landingCard secondCardRow">
//                             <InventoryLandingCard
//                                 topic="Low Stock Item" inventoryValues="2" textColor="#3F72AF">
//                             </InventoryLandingCard>
//                         </div>
//                         <div className="landingCard secondCardRow">
//                             <InventoryLandingCard
//                                 topic="Overall Stock Status" inventoryValues="Healthy" textColor="#1FAB89">
//                             </InventoryLandingCard>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//
//             <Footer/>
//         </>
//     )
// }
//
// export default InventoryLanding;

import { useState } from 'react'
import './inventoryLanding.css'
import Header from '../../../../layout/adminPanel/header'
import Sidebar from '../../../../layout/adminPanel/sidebar'
import Home from '../../../../layout/adminPanel/home'

function InventoryLanding() {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle)
    }

    return (
        <div className='grid-container'>
            <Header OpenSidebar={OpenSidebar}/>
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
            <Home />
        </div>
    )
}

export default InventoryLanding;