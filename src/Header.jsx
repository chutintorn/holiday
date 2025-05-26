import React from 'react';
import './App.css';

const Header = () => {
  return (
    <div className="header">
      {/* === Left Column: Logo + Moving Ads === */}
      <div className="header-left">
        <img src="/Holidylogo.png" alt="Nok Logo" className="logo" />
        <span className="brand"> Special Package</span>

        {/* ✅ Ads Carousel beside logo */}
        <div className="ads-carousel">
          <div className="ads-track">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVE95tUz2Uakg7g1APUElEwX6QOxVUvJw2RQ&s" alt="Ad 1" />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxTDB1BH6i9DmPgNBwTNRxe_thzRDaJWyrqF-426T64U4_MUhYAwle9bf0HZsOq6rCLvQ&usqp=CAU" alt="Ad 2" />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t4Db1uRy_CoDFJx-Kulm6LE1we9HS7lLPQ&s" alt="Ad 3" />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsXg15XmHi1FsxSy0iqQecGq-S-aAIllKYBw&s" alt="Ad 4" />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvS14VB59jZ4kuOrV1mGODKm30hceRTNvYsw&s" alt="Ad 5" />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVT2nLjWmANDfUMY7rzwvuHWHJSMjjgmVpOg&s" alt="Ad 6" />
            <img src="https://www.govivigo.com/content/news/5d1da5519a771ca71d0000a0-1-og.jpg" alt="Ad 7" />
            {/* Repeat for smoother loop */}
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVE95tUz2Uakg7g1APUElEwX6QOxVUvJw2RQ&s" alt="Ad 1" />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t4Db1uRy_CoDFJx-Kulm6LE1we9HS7lLPQ&s" alt="Ad 3" />
            <img src="https://www.govivigo.com/content/news/5d1da5519a771ca71d0000a0-1-og.jpg" alt="Ad 7" />
          </div>
        </div>
      </div>

      {/* === Navigation Tabs === */}
      <div className="header-nav">
        <span>Booking</span>
        <span>Trip Search</span>
        <span>Manage My Trip</span>
        <span>Trip Info</span>
        <span>New Members Club</span>
        <span>Member Login</span>
        <span>Other Services</span>
      </div>
    </div>
  );
};

export default Header;
