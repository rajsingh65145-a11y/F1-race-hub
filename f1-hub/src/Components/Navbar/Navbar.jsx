import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/drivers', label: 'Drivers' },
  { path: '/teams', label: 'Teams' },
  { path: '/calendar', label: 'Calendar' },
  { path: '/standings', label: 'Standings' },
  { path: '/circuits', label: 'Circuits' },
  { path: '/compare', label: 'Compare' },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <span className="navbar-logo">F1 RACE HUB</span>

        <button className="navbar-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? 'Close' : 'Menu'}
        </button>

        <ul className={`navbar-links ${isOpen ? 'navbar-links-open' : ''}`}>
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) => (isActive ? 'active' : '')}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;