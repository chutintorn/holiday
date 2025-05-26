// InsurancePage.jsx
import React from 'react';
import Header from './Header';
import NavBar from './NavBar';
import './App.css';

const InsurancePage = () => {
  return (
    <>
      <Header />
      <NavBar active={7} setActive={() => {}} /> {/* Adjust if needed */}

      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>ประกันการเดินทาง</h2>
        <p>เลือกประกันการเดินทางที่เหมาะสมเพื่อความอุ่นใจตลอดทริป</p>

        <div style={{ marginTop: '30px', fontStyle: 'italic' }}>
          🛡️ เร็วๆ นี้คุณจะสามารถเลือกความคุ้มครองได้ตรงใจ
        </div>
      </div>
    </>
  );
};

export default InsurancePage;
