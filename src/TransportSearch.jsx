import React, { useState } from 'react';
import './App.css';

const translations = {
  th: {
    title: 'บริการจองรถรับส่ง',
    ride: 'เหมาจุด',
    hour: 'รายชั่วโมง',
    from: 'ต้นทาง (ที่อยู่ / สนามบิน / โรงแรม)',
    to: 'ปลายทาง (ที่อยู่ / สนามบิน / โรงแรม)',
    phone: 'เบอร์โทรศัพท์',
    budget: 'งบประมาณโดยประมาณ (บาท)',
    search: 'ค้นหา',
    grab: 'จองผ่าน Grab',
    language: 'ภาษา ไทย',
  },
  en: {
    title: 'Transport Booking Service',
    ride: 'Ride',
    hour: 'Per Hour',
    from: 'From: address / airport / hotel',
    to: 'To: address / airport / hotel',
    phone: 'Phone Number',
    budget: 'Estimated Budget (THB)',
    search: 'Search',
    grab: 'Book via Grab',
    language: 'Language English',
  }
};

const TransportSearch = () => {
  const [language, setLanguage] = useState('th');
  const t = translations[language];

  const [mode, setMode] = useState('ride');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [phone, setPhone] = useState('');
  const [budget, setBudget] = useState('');

  const handleSearch = () => {
    alert(
      `${t.title}:\nMode: ${t[mode]}\nFrom: ${from}\nTo: ${to}\nPhone: ${phone}\nBudget: ${budget}`
    );
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
      {/* Title + Language toggle on same line */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
        }}
      >
        <h2 style={{ fontSize: '24px', margin: 0 }}>{t.title}</h2>
        <button
          onClick={() => setLanguage(lang => lang === 'th' ? 'en' : 'th')}
          style={{
            fontSize: '14px',
            padding: '6px 12px',
            border: '1px solid #ccc',
            borderRadius: '6px',
            cursor: 'pointer',
            backgroundColor: '#f9f9f9',
          }}
        >
          {t.language}
        </button>
      </div>

      {/* Mode Selector */}
      <div style={{
        display: 'flex',
        border: '1px solid orange',
        borderRadius: '40px',
        overflow: 'hidden',
        marginBottom: '20px'
      }}>
        <button
          onClick={() => setMode('ride')}
          style={{
            flex: 1,
            backgroundColor: mode === 'ride' ? '#beff33' : 'white',
            color: mode === 'ride' ? 'black' : 'black',
            padding: '12px 0',
            fontWeight: 'bold',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          🚖 {t.ride}
        </button>
        <button
          onClick={() => setMode('hour')}
          style={{
            flex: 1,
            backgroundColor: mode === 'hour' ? '#beff33' : 'white',
            color: mode === 'hour' ? 'black' : 'black',
            padding: '12px 0',
            fontWeight: 'bold',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          🕒 {t.hour}
        </button>
      </div>

      {/* Input Fields */}
      <input
        type="text"
        placeholder={t.from}
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        style={inputStyle}
      />

      <input
        type="text"
        placeholder={t.to}
        value={to}
        onChange={(e) => setTo(e.target.value)}
        style={inputStyle}
      />

      <input
        type="tel"
        placeholder={t.phone}
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={inputStyle}
      />

      <input
        type="number"
        placeholder={t.budget}
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
        style={inputStyle}
      />

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="search-button"
      >
        {t.search}
      </button>

      {/* Grab Booking Button */}
      <a
        href="https://m.grab.com/"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          marginTop: '16px',
          padding: '12px 24px',
          borderRadius: '32px',
          background: '#00b14f',
          color: 'white',
          fontWeight: 'bold',
          textDecoration: 'none'
        }}
      >
        {t.grab}
      </a>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '12px',
  marginBottom: '12px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  fontSize: '14px',
};

export default TransportSearch;
