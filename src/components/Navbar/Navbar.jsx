import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { TokenContext } from '../../Context/TokenContext'
import { CartContext } from '../../Context/CartContext';

export default function Navbar() {
    let { token, setToken } = useContext(TokenContext);
    let { cartCount } = useContext(CartContext);
    let navigate = useNavigate();

    function Logout() {
        localStorage.removeItem("userToken");
        setToken(null);
        navigate('/login');
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container">
                    <NavLink to={'/home'} className="navbar-brand">Products App</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            {token ? <>
                                <li className="nav-item">
                                    <NavLink to={'/home'} className="nav-link">Home</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to={'/about'} className="nav-link">About</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to={'/contact'} className="nav-link">Contact</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to={'/cart'} className="nav-link">
                                        <i className="fa-solid fa-shopping-cart position-relative me-2">
                                            {cartCount > 0 && (
                                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary ms-2">
                                                    {cartCount}
                                                </span>
                                            )}
                                        </i>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <p onClick={Logout} className="nav-link" style={{ cursor: 'pointer' }}>Logout</p>
                                </li>
                            </> : <>
                                <li className="nav-item">
                                    <NavLink to={'/register'} className="nav-link" >Register</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to={'/login'} className="nav-link">Login</NavLink>
                                </li>
                            </>}

                        </ul>
                    </div>
                </div>
            </nav>

        </>
    )
}
