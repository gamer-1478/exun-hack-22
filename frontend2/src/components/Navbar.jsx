import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { checkLoggedIn, getUser } from '../misc/resuse';
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
        console.log("useEffect");
        getUser().then((res)=>{
            console.log(res)
            if (res.email) {
                setlogged(true);
            }
        });
        listenStorage();
        checkLoggedIn();
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
                            to='/Store' className='nav-links' onClick={() => { closeMobileMenu() }}>
                            Store
                        </Link>
                    </li >

                    <li className='nav-item'>
                        <Link
                            to='/Practice' className='nav-links' onClick={closeMobileMenu}>
                            Community
                        </Link>
                    </li>

                    <li className='nav-item'>
                        <Link
                            to='/Support' className='nav-links' onClick={closeMobileMenu}>
                            Support
                        </Link>
                    </li>


                    {logged ? (
                        <>
                        <li>
                            <Link to='/cart'
                                className='nav-links' onClick={closeMobileMenu}>
                                Cart
                            </Link>
                        </li>

                        <li>
                            <Link to='/Profile'
                                className='nav-links-mobile' onClick={closeMobileMenu}>
                                Profile
                            </Link>
                        </li>
                        </>
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
                <>
                    <img className='cart-icon' src='https://cdn-icons-png.flaticon.com/512/263/263142.png' alt='cart' onClick={()=>rederto('/cart')}/>
                    <br></br>
                    <div className='button-show-mobile'>
                        <button className='btn--primary--black' offset='80' onClick={()=>rederto('/profile')}>Profile</button>
                    </div>
                    </>
                    :
                    <div className='button-show-mobile'>
                        <button className='btn--primary--black' offset='80' onClick={()=>rederto('/login')}>SignIn</button>
                    </div>
                }
            </div>
        </nav>
    )
}

function rederto(path) {
    window.location.href = path;
}

export default NavigationBar;
