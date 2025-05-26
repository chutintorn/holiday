// PointsPage.jsx
import React from 'react';
import Header from './Header';
import NavBar from './NavBar';
import './App.css';

const PointsPage = () => {
  return (
    <>
      <Header />
      <NavBar active={6} setActive={() => {}} /> {/* Adjust if needed */}

      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>โอนคะแนน</h2>
        <p>โอนหรือแลกคะแนนสะสมกับพาร์ทเนอร์ของเราได้ที่นี่</p>

        <div style={{ marginTop: '30px', fontStyle: 'italic' }}>
          🪙 ระบบกำลังจัดเตรียมสำหรับการโอนคะแนนสะดวกยิ่งขึ้น
        </div>
      </div>
    </>
  );
};

export default PointsPage;
