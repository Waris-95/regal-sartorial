import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../redux/session';
import { getCurrentOrder } from '../../redux/orders';
import { editBag } from '../../redux/bags';
import './Navigation.css';
import '../../index.css';
import { FaCrown } from "react-icons/fa";
import { FaBars, FaTimes } from "react-icons/fa";

function Navigation({ isLoaded }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const bag = useSelector((state) => state.bag);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  useEffect(() => {
    if (sessionUser) {
      dispatch(getCurrentOrder());
    }
  }, [dispatch, sessionUser]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(editBag(0));
    dispatch(logout()).then(() => closeMobileMenu());
    navigate('/');
  };

  const categories = [
    'Suits',
    'Pants',
    'Jeans',
    'Vests',
    'Jackets',
    'Shirts',
    'Shoes',
    'Accessories',
    'View All',
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="regal-logo" onClick={closeMobileMenu}>
          <FaCrown style={{ marginRight: '8px' }} /> Regal Sartorial
        </NavLink>
        <div className="menu-icon" onClick={handleClick}>
          {click ? <FaTimes /> : <FaBars />}
        </div>
        <ul className={click ? 'menu active' : 'menu'}>
          <li className="nav-item shop-item">
            <div className="dropdown-categories">
              <button
                className="nav-links shop-btn"
                onMouseOver={handleOpen}
                onMouseLeave={handleClose}
              >
                Shop
              </button>
              {open && (
                <ul
                  onMouseEnter={handleOpen}
                  onMouseLeave={handleClose}
                  className="drop-down-menu-categories"
                >
                  {categories.map((category, i) => (
                    <div className="category-list-container" key={i}>
                      <li>
                        <NavLink
                          onClick={handleClose}
                          className="category-link"
                          to={{
                            pathname: '/shop',
                            search: `?category=${category}`,
                          }}
                        >
                          {category}
                        </NavLink>
                      </li>
                    </div>
                  ))}
                </ul>
              )}
            </div>
          </li>
          {isLoaded && (
            <>
              {sessionUser ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/favorites" className="nav-links" onClick={closeMobileMenu}>
                      Favorites
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/styles" className="nav-links" onClick={closeMobileMenu}>
                      My Wardrobe
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/checkout" className="nav-links my-bag" onClick={closeMobileMenu}>
                      Cart {bag > 0 && ` (${bag})`}
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/account" className="nav-links" onClick={handleLogout}>
                      Log Out
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink to="/signup" className="nav-links" onClick={closeMobileMenu}>
                      Sign Up
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-links" onClick={closeMobileMenu}>
                      Log In
                    </NavLink>
                  </li>
                </>
              )}
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;

