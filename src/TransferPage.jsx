// TransferPage.jsx
import React from 'react';
import Header from './Header';
import NavBar from './NavBar';
import TransportSearch from './TransportSearch';
import './App.css';

const TransferPage = () => {
  return (
    <>
      <Header />
      <NavBar active={3} setActive={() => {}} />

      {/* Main container with reduced top spacing */}
      <div style={{
        margin: '0 auto',
        maxWidth: '800px',
        padding: '10px 20px 40px',  // Top padding reduced from 20 to 10
      }}>
        {/* Title and language (title handled inside TransportSearch) */}
        <TransportSearch />
      </div>
    </>
  );
};

export default TransferPage;
