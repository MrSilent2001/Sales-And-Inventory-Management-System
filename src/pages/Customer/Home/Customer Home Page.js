import React from "react";
import './Customer Home Page.css'
function CustomerHome(){
    return(
        <div className="custoemrHome">

            <div className="carouselOuter">
                <img src={require('./HomeCarousel.jpg')} alt=""/>
            </div>
        </div>
    )
}

export default CustomerHome;