import React from "react";
import "./footer.css";
function footer(){
    return(
        <div className="footer">
            <div className="logoName">
              <h5>Tradeasy</h5>
            </div>
            <div className="footerLinks">
                <a href="#">About Us</a>
                <a href="#">Privacy and Policy</a>
                <a href="#">Support</a>
            </div>
            <div className="copyright">
                <p>Copyright© 2023 Delta-V</p>
            </div>
        </div>
    )
}

export default footer;