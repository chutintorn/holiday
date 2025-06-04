// NavBar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'; // Use NavBar.css if you separated styles

const NavBar = ({ active, setActive }) => {
  const navigate = useNavigate();

  const navItems = [
    {
      label: 'เที่ยวบิน',
      icon: (
        <img
          src="https://www.svgrepo.com/show/24933/airplane-flight.svg"
          alt="plane"
          style={{ width: '10px', height: '20px' }}
        />
      ),
      route: '/', // ✅ Add route for main tab
    },
    {
      label: 'เที่ยวบิน+โรงแรม',
      icon: (
        <span style={{ display: 'flex', gap: '4px', alignItems: 'center', marginLeft: '6px' }}>
          <img
            src="https://www.svgrepo.com/show/24933/airplane-flight.svg"
            alt="plane"
            style={{ width: '15px', height: '20px' }}
          />
          <img
            src="https://cdn-icons-png.flaticon.com/512/88/88973.png"
            alt="hotel"
            style={{ width: '20px', height: '20px' }}
          />
        </span>
      ),
      route: '/flighthotel',
    },
    {
      label: 'โรงแรม',
      icon: (
        <img
          src="https://cdn-icons-png.flaticon.com/512/88/88973.png"
          alt="Hotel"
          style={{ width: '20px', height: '20px' }}
        />
      ),
      route: '/hotels', // ✅ Define additional route
    },
    {
      label: 'บริการถรับส่ง',
      icon: (
        <img
          src="https://cdn-icons-png.flaticon.com/512/75/75780.png"
          alt="Taxi"
          style={{ width: '15px', height: '20px' }}
        />
      ),
      route: '/transfers',
    },
    {
      label: 'อีเวนต์และกิจกรรม',
      icon: (
        <img
          src="https://cdn.iconscout.com/icon/premium/png-256-thumb/holiday-activities-981886.png"
          alt="Event"
          style={{ width: '15px', height: '30px' }}
        />
      ),
      route: '/events',
    },
    {
      label: 'การจองของฉัน',
      icon: (
        <img
          src="https://icon-library.com/images/reservation-icon-png/reservation-icon-png-29.jpg"
          alt="Manage My Trip"
          style={{ width: '25px', height: '30px' }}
        />
      ),
      route: '/chat',
    },
    {
      label: 'เช็ค>ใช้>ให้โอนคะแนนสะสม',
      icon: (
        <img
          src="https://static.thenounproject.com/png/3918203-200.png"
          alt="Points"
          style={{ width: '22px', height: '30px' }}
        />
      ),
      route: '/points',
    },
    {
      label: 'อุ่นใจการเดินทาง',
      icon: (
        <img
          src="https://cdn-icons-png.flaticon.com/512/3729/3729428.png"
          alt="Insurance"
          style={{ width: '20px', height: '20px' }}
        />
      ),
      route: '/insurance',
    },
  ];

  return (
    <div className="tab-container">
      {navItems.map((item, index) => (
        <button
          key={index}
          className={`tab-button ${active === index ? 'active' : ''}`}
          onClick={() => {
            if (active !== index) {
              setActive(index);
              if (item.route) {
                navigate(item.route);
              }
            }
          }}
        >
          <span>{item.label}</span>
          <span className="tab-icon">{item.icon}</span>
        </button>
      ))}
    </div>
  );
};

export default NavBar;
