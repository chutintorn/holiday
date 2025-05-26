// ChatPage.jsx
import React from 'react';
import Header from './Header';
import NavBar from './NavBar';
import './App.css';

const ChatPage = () => {
  return (
    <>
      <Header />
      <NavBar active={5} setActive={() => {}} /> {/* Adjust if needed */}

      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>จัดการ การเดินทางของฉัน</h2>
        <p>เริ่มต้นแชทกับผู้ช่วยดิจิทัลของนกแอร์ได้ที่นี่</p>

        <div style={{ marginTop: '30px', fontStyle: 'italic' }}>
          💬 ระบบกำลังพัฒนาเพื่อช่วยเหลือคุณตลอด 24 ชั่วโมง
        </div>
      </div>
    </>
  );
};

export default ChatPage;
