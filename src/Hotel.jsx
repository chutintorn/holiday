// Hotel.jsx
import React from 'react';
import Header from './Header';            // ✅ Reuse main header
import NavBar from './NavBar';            // ✅ Tab navigation
import SearchHotelBox from './SearchHotelBox'; // ✅ Hotel search box with dropdown
import './App.css';                       // ✅ Shared styling

const Hotel = () => {
  return (
    <>
      <Header />
      <NavBar active={2} setActive={() => {}} />

  
      <div style={{ padding: '0 40px 40px' }}>
        <SearchHotelBox /> {/* ✅ Integrated hotel search form */}
      </div>
    </>
  );
};

export default Hotel;
