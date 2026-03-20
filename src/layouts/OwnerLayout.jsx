import React from 'react';
import { useNavigate } from 'react-router-dom';
import './OwnerLayout.css';

const OwnerLayout = ({ children }) => {
  const navigate = useNavigate();

  const menuItems = [
    { label: 'Dashboard', icon: '📊', path: '/owner/dashboard' },
    { label: 'My Properties', icon: '🏠', path: '/owner/my-properties' },
    // { label: 'Bookings', icon: '📅', path: '/owner/bookings' },
    { label: 'Earnings', icon: '💰', path: '/owner/earnings' }
  ];

  return (
    <div className="owner-layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Owner Portal</h2>
        </div>
        <nav className="sidebar-nav">
          <ul>
            {menuItems.map((item, index) => (
              <li 
                key={index} 
                className="nav-item"
                onClick={() => navigate(item.path)}
              >
                <span className="nav-icon">{item.icon}</span>
                {item.label}
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <div className="main-content">
        <header className="top-navbar">
          <div className="navbar-left">
            <h3>Grandview Properties</h3>
          </div>
          <div className="navbar-right">
            <span>Notifications</span>
            <span>Profile</span>
          </div>
        </header>
        <main className="content-area">
          {children}
        </main>
      </div>
    </div>
  );
};

export default OwnerLayout;