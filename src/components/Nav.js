import { Link, useNavigate } from "react-router-dom";
import { useMemo } from "react";

const Nav = () => {
    const navigate = useNavigate();
    const auth = useMemo(() => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }, []);

    const logout = () => {
        localStorage.clear();
        navigate('/signup', { replace: true });
    };

    return (
        <div className="nav-header">
            <div className="logo">
                <Link
                    to="/"
                    className="logo-link"
                    aria-label="Go to homepage"
                >
                    MyApp
                </Link>
            </div>

            {auth ? (
                <ul className="nav-ul">
                    <li><Link to="/">Product</Link></li>
                    <li><Link to="/add">Add Product</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li>
                        <button
                            onClick={logout}
                            className="logout-btn"
                            aria-label="Logout"
                            style={{
                                background: "none",
                                border: "none",
                                color: "inherit",
                                cursor: "pointer",
                                padding: 0,
                                font: "inherit"
                            }}
                        >
                            Logout <span className="username">({auth.name})</span>
                        </button>
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