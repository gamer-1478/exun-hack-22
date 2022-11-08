import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'

function NavigationBar() {
    const [click, setClick] = useState(false);
    const [logged, setlogged] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const listenStorage = () => {
        localStorage.getItem('User') ? setlogged(true) : setlogged(false);
    }
    window.addEventListener('storage', () => {
        listenStorage();
    })
    useEffect(() => {
    }, []);

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                    HCET Studios
                </Link>

                <div className='menu-icon' onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>

                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className='nav-item'>
                        <Link
                            to='/Events' className='nav-links' onClick={() => { closeMobileMenu() }}>
                            Events
                        </Link>
                    </li >

                    <li className='nav-item'>
                        <Link
                            to='/Practice' className='nav-links' onClick={closeMobileMenu}>
                            Practice
                        </Link>
                    </li>

                    {logged ? (
                        <li>
                            <Link to='/Profile'
                                className='nav-links-mobile' onClick={closeMobileMenu}>
                                Profile
                            </Link>
                        </li>
                    ) : (
                        <li>
                            <Link to='/login'
                                className='nav-links-mobile' onClick={closeMobileMenu}>
                                SignIn
                            </Link>
                        </li>
                    )}
                </ul>
                {logged ?
                    <div className='button-show-mobile'>
                        <button buttonStyle='btn--primary--black' offset='80' path='/Profile'>Profile</button>
                    </div>
                    :
                    <div className='button-show-mobile'>
                        <button buttonStyle='btn--primary--black' offset='80' path='/login'>SignIn</button>
                    </div>
                }
            </div>
        </nav>
    )
}

export default NavigationBar;
