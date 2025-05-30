// src/components/Nav.js
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate('/signup');
        window.location.reload();
    };

    return (
        <div className="nav-header">
            <div className="logo">
                <Link to="/" style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.25rem', textDecoration: 'none' }}>
                    MyApp
                </Link>
            </div>

            {auth ? (
                <ul className="nav-ul">
                    <li><Link to="/">Product</Link></li>
                    <li><Link to="/add">Add Product</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li>
                        <Link onClick={logout} to="#">
                            Logout <span className="username">({JSON.parse(auth).name})</span>
                        </Link>
                    </li>
                </ul>
            ) : (
                <ul className="nav-ul">
                    <li><Link to="/signup">SignUp</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            )}
        </div>
    );
};

export default Nav;
