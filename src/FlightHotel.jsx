// FlightHotel.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import NavBar from './NavBar'; // ✅ Import NavBar
import Header from './Header';     
import FlightHotelSearch from './FlightHotelSearch'; // ✅ Import Search component

function FlightHotel() {
  const navigate = useNavigate();
  const [active, setActive] = useState(1); // Default: "(เที่ยวบิน+โรงแรม)"

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      {/* Header */}
      <Header />     
      {/* <div className="header">
        <div className="header-left">
          <img src="/Holidylogo.png" alt="Nok Logo" className="logo" />
          <span className="brand">Holiday & Vacation Choices</span>
        </div>
        <div className="header-nav">
          <span>Booking</span>
          <span>Trip Search</span>
          <span>Manage My Trip</span>
          <span>Trip Info</span>
          <span>New Members Club</span>
          <span>Member Login</span>
          <span>Other Services</span>
        </div>
      </div> */}

      {/* Nav Tabs (Now using NavBar Component) */}
      <NavBar active={active} setActive={setActive} />

      {/* Search Form */}
      <div style={{ padding: '30px' }}>
        <FlightHotelSearch />

        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          style={{
            marginTop: '10px',
            padding: '8px 16px',
            fontSize: '14px',
            backgroundColor: '#33ffff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          ⬅️ กลับหน้าหลัก
        </button>
      </div>
    </div>
  );
}

export default FlightHotel;
