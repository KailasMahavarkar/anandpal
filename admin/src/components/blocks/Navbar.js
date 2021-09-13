import React from 'react';
import { useState } from 'react';


const Navbar = (props) => {
    
    const [choice, setChoice] = useState('');

    return (
        <div className="navbar">
            <div className="navbar__logo" onClick={()=>setChoice("home")}>
                AnandPal
            </div>

            <div className="navbar__menu">
                <div className="navbar__menu__item" onClick={props.handleHistory}>
                    Blogs
                </div>
                <div className="navbar__menu__item" onClick={()=>setChoice("admin")}>
                    Admin
                    </div>
                <div className="navbar__menu__item" onClick={()=>setChoice("logout")}>
                    logout
                </div>
            </div>
        </div>
    )
}

export default Navbar
