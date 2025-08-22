import React from "react";
import '../componentStyles/HamburgerNav.css';

const HamburgerNav = () => {
  return (
    <>
      <input
        type="checkbox"
        id="main-navigation-toggle"
        className="btn btn--close"
        title="Toggle main navigation"
      />
      <label htmlFor="main-navigation-toggle">
        <span></span>
      </label>

      <nav id="main-navigation" className="nav-main">
        <ul className="menu">
          <li className="menu__item">
            <a className="menu__link" href="#0">Home</a>
          </li>
          <li className="menu__item">
            <a className="menu__link" href="#0">About</a>
          </li>
          <li className="menu__item">
            <a className="menu__link" href="#0">Clients</a>
            {/* <ul className="submenu">
              <li className="menu__item">
                <a className="menu__link" href="#0">Burger King</a>
              </li>
              <li className="menu__item">
                <a className="menu__link" href="#0">Southwest Airlines</a>
              </li>
              <li className="menu__item">
                <a className="menu__link" href="#0">Levi Strauss</a>
              </li>
            </ul> */}
          </li>
          <li className="menu__item">
            <a className="menu__link" href="#0">Services</a>
            {/* <ul className="submenu">
              <li className="menu__item">
                <a className="menu__link" href="#0">Print Design</a>
              </li>
              <li className="menu__item">
                <a className="menu__link" href="#0">Web Design</a>
              </li>
              <li className="menu__item">
                <a className="menu__link" href="#0">Mobile App Development</a>
              </li>
            </ul> */}
          </li>
          <li className="menu__item">
            <a className="menu__link" href="#0">Contact</a>
          </li>
        </ul>
      </nav>

    </>
  );
};

export default HamburgerNav;
