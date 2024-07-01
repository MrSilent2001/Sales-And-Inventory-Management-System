import React from 'react'
import './adminPanel.css';
import
{BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill,
    BsListCheck, BsMenuButtonWideFill, BsFillGearFill}
    from 'react-icons/bs'

function Sidebar({openSidebarToggle, OpenSidebar, openProfileModal }) {
    return (
        <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
            <div className='sidebar-title'>
                <div className='sidebar-brand'>
                    <img  src='/Logo.png' alt='' className='icon_header'/> Tradeasy
                </div>
                <span className='icon close_icon' onClick={OpenSidebar}>X</span>
            </div>

            <ul className='sidebar-list'>
                {/*<li className='sidebar-list-item'>*/}
                {/*    <a href="">*/}
                {/*        <BsGrid1X2Fill className='icon'/> Dashboard*/}
                {/*    </a>*/}
                {/*</li>*/}
                <li className='sidebar-list-item'>
                    <a href="/pendingOrders">
                        <BsFillArchiveFill className='icon'/> Sales
                    </a>
                </li>
                {/*<li className='sidebar-list-item'>*/}
                {/*    <a href="">*/}
                {/*        <BsFillGrid3X3GapFill className='icon'/> Categories*/}
                {/*    </a>*/}
                {/*</li>*/}

                <li className='sidebar-list-item'>
                    <a href="/viewInventory">
                        <BsListCheck className='icon'/> Inventory
                    </a>
                </li>

                <li className='sidebar-list-item'>
                    <a href="" onClick={(e) => { e.preventDefault(); openProfileModal();}}>
                        <BsPeopleFill className='icon'/> Profile
                    </a>
                </li>

                {/*<li className='sidebar-list-item'>*/}
                {/*    <a href="/viewInventory">*/}
                {/*        <BsMenuButtonWideFill className='icon'/> Reviews*/}
                {/*    </a>*/}
                {/*</li>*/}
                {/*<li className='sidebar-list-item'>*/}
                {/*    <a href="/viewInventory">*/}
                {/*        <BsFillGearFill className='icon'/> Setting*/}
                {/*    </a>*/}
                {/*</li>*/}
            </ul>
        </aside>
    )
}

export default Sidebar