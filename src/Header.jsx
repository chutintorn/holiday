import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { BsRobot, BsSearch, BsPerson, BsCalendarCheck } from 'react-icons/bs'; // ✅ Updated icons
import './App.css';

// ✅ Tabs with updated calendar icon for Booking
const tabs = [
  {
    name: 'Booking',
    icon: <BsCalendarCheck style={{ marginRight: '6px', color: '#000' }} />,
    href: '#booking',
  },
  {
    name: 'Trip Search',
    icon: <BsSearch style={{ marginRight: '6px', color: '#000' }} />,
    href: '#trip-search',
  },
  {
    name: 'Chat to Nok Holiday',
    icon: <BsRobot style={{ marginRight: '6px', color: '#000' }} />,
    href: '#club',
  },
  {
    name: 'Member Login',
    icon: <BsPerson style={{ marginRight: '6px', color: '#000' }} />,
    href: '#login',
  },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <div className="header">
        {/* === Logo + Special Package + Moving Ads === */}
        <div className="header-left">
          <img src="/Holidylogo.png" alt="Nok Logo" className="logo" />
          <span className="brand"> Special Package</span>

          <div className="ads-carousel">
            <div className="ads-track">
              {[
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVE95tUz2Uakg7g1APUElEwX6QOxVUvJw2RQ&s",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxTDB1BH6i9DmPgNBwTNRxe_thzRDaJWyrqF-426T64U4_MUhYAwle9bf0HZsOq6rCLvQ&usqp=CAU",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t4Db1uRy_CoDFJx-Kulm6LE1we9HS7lLPQ&s",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsXg15XmHi1FsxSy0iqQecGq-S-aAIllKYBw&s",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvS14VB59jZ4kuOrV1mGODKm30hceRTNvYsw&s",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVT2nLjWmANDfUMY7rzwvuHWHJSMjjgmVpOg&s",
                "https://www.govivigo.com/content/news/5d1da5519a771ca71d0000a0-1-og.jpg",
              ].map((src, i) => (
                <img key={i} src={src} alt={`Ad ${i + 1}`} />
              ))}
            </div>
          </div>
        </div>

        {/* === Hamburger Button (Mobile Only) === */}
        <button
          onClick={() => setMobileOpen(true)}
          style={{
            backgroundColor: '#ffda33',
            padding: '8px 12px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            border: '1px solid #ccc',
            color: 'black',
          }}
        >
          <Menu size={24} />
        </button>

        {/* === Desktop Tabs === */}
        <div className="tab-container hidden md:flex" style={{ backgroundColor: 'transparent', padding: 0 }}>
          {tabs.map(tab => (
            <a
              key={tab.name}
              href={tab.href}
              className="tab-button"
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                boxShadow: 'none',
                color: '#000',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              {tab.icon}
              {tab.name}
            </a>
          ))}
        </div>
      </div>

      {/* === Side Menu (Mobile) === */}
      <div className={`sidebar ${mobileOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <button onClick={() => setMobileOpen(false)} className="close-button">
            <X size={24} />
          </button>
        </div>
        <nav className="sidebar-links">
          {tabs.map(tab => (
            <a key={tab.name} href={tab.href} className="sidebar-link" onClick={() => setMobileOpen(false)}>
              {tab.icon}
              {tab.name}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Header;
