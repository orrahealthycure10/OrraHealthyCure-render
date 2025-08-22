import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import '../componentStyles/Navbar.css';
import '../pageStyles/Search.css';
import { useSelector } from 'react-redux';
import logoorra from '../assets/logo.png';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const { isAuthenticated } = useSelector(state => state.user);
  const { cartItems } = useSelector(state => state.cart);

  const navigate = useNavigate();

  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?keyword=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate(`/products`);
    }
    setSearchQuery("");
  };

  // 🔹 Disable scrolling when menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
  }, [isMenuOpen]);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          {/* Logo */}
          <div className='navbar-logo'>
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              <img src={logoorra} alt="OraHealthyCure" className='orralogo' />
            </Link>
          </div>

          {/* Menu Links */}
          <div className={`navbar-links ${isMenuOpen ? 'active' : ""}`}>
            <ul>
              <li onClick={() => setIsMenuOpen(false)}><Link to="/">Home</Link></li>
              <li onClick={() => setIsMenuOpen(false)}><Link to="/products">Products</Link></li>
              <li onClick={() => setIsMenuOpen(false)}><Link to="/about-us">About Us</Link></li>
              <li onClick={() => setIsMenuOpen(false)}><Link to="/contact-us">Contact Us</Link></li>
            </ul>
          </div>

          {/* Icons */}
          <div className="navbar-icons">
            <div className="search-container">
              <form className={`search-form ${isSearchOpen ? 'active' : ''}`} onSubmit={handleSearchSubmit}>
                <input 
                  type="text"
                  className='search-input'
                  placeholder='Search products..'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="button" className="search-icon" onClick={toggleSearch}>
                  <SearchIcon focusable="false" />
                </button>
              </form>
            </div>

            <div className="cart-container">
              <Link to="/cart" onClick={() => setIsMenuOpen(false)}>
                <ShoppingCartIcon className="icon" />
                <span className="cart-badge">{cartItems.length}</span>
              </Link>
            </div>

            {!isAuthenticated && (
              <Link to="/register" className='register-link' onClick={() => setIsMenuOpen(false)}>
                <PersonAddIcon className='icon' />
              </Link>
            )}

            <div className="navbar-hamburger" onClick={toggleMenu}>
              {isMenuOpen ? <CloseIcon className='icon' /> : <MenuIcon className='icon' />}
            </div>
          </div>
        </div>
      </nav>

      {/* 🔹 Overlay for blur + click to close */}
      {isMenuOpen && <div className="navbar-overlay" onClick={toggleMenu}></div>}
    </>
  );
}

export default Navbar;













// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import SearchIcon from '@mui/icons-material/Search';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import CloseIcon from '@mui/icons-material/Close';
// import MenuIcon from '@mui/icons-material/Menu';
// import '../componentStyles/Navbar.css';
// import '../pageStyles/Search.css';
// import { useSelector } from 'react-redux';
// import logoorra from '../assets/logo.png';

// function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');

//   const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
//   const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

//   const { isAuthenticated } = useSelector((state) => state.user);
//   const { cartItems } = useSelector((state) => state.cart);

//   const navigate = useNavigate();
//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       navigate(`/products?keyword=${encodeURIComponent(searchQuery.trim())}`);
//     } else {
//       navigate(`/products`);
//     }
//     setSearchQuery('');
//   };

//   // Prevent scroll when menu is open
//   useEffect(() => {
//     document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
//   }, [isMenuOpen]);

//   return (
//     <nav className='navbar'>
//       <div className='navbar-container'>

//         {/* Hamburger Icon - Always Left */}
//         <div className='hamburger-container' onClick={toggleMenu}>
//           {isMenuOpen ? <CloseIcon className='icon' /> : <MenuIcon className='icon' />}
//         </div>

//         {/* Logo Center */}
//         <div className='navbar-logo'>
//           <Link to='/' onClick={() => setIsMenuOpen(false)}>
//             <img src={logoorra} alt='OraHealthyCure' className='orralogo' />
//           </Link>
//         </div>

//         {/* Right Icons */}
//         <div className='navbar-icons'>
//           <div className='searchBox'>
//             <form
//               className={`search-form ${isSearchOpen ? 'active' : ''}`}
//               onSubmit={handleSearchSubmit}
//             >
//               <input
//                 className='searchInput'
//                 type='text'
//                 placeholder='Search products..'
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//               <button
//                 className='searchButton'
//                 type='button'
//                 onClick={toggleSearch}
//               >
//                 <SearchIcon />
//               </button>
//             </form>
//           </div>

//           <div className='cart-container'>
//             <Link to='/cart'>
//               <ShoppingCartIcon className='icon' />
//               <span className='cart-badge'>{cartItems.length}</span>
//             </Link>
//           </div>

//           {!isAuthenticated && (
//             <Link to='/register' className='register-link'>
//               <PersonAddIcon className='icon' />
//             </Link>
//           )}
//         </div>
//       </div>

//       {/* Side Menu Links */}
//       <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
//         <ul>
//           <li><Link to='/' onClick={() => setIsMenuOpen(false)}>Home</Link></li>
//           <li><Link to='/products' onClick={() => setIsMenuOpen(false)}>Products</Link></li>
//           <li><Link to='/about-us' onClick={() => setIsMenuOpen(false)}>About Us</Link></li>
//           <li><Link to='/contact' onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
//         </ul>
//       </div>

//       {/* Blur Overlay */}
//       {isMenuOpen && <div className='navbar-overlay' onClick={toggleMenu}></div>}
//     </nav>
//   );
// }

// export default Navbar;

