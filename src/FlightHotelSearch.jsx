// SearchHotelBox.jsx
import React, { useState, useEffect } from 'react';
import './App.css';

const translations = {
  th: {
    destination: 'ปลายทาง',
    placeholder: 'ลอง "Kuala Lumpur"',
    checkin: 'เช็คอิน',
    checkout: 'เช็คเอาท์',
    guestsAndRooms: 'ผู้โดยสาร & ห้อง',
    guests: 'ผู้โดยสาร',
    rooms: 'ห้อง',
    close: 'ปิด',
    search: 'ค้นหา',
  },
  en: {
    destination: 'Destination',
    placeholder: 'Try "Kuala Lumpur"',
    checkin: 'Check-in',
    checkout: 'Check-out',
    guestsAndRooms: 'Guests & Rooms',
    guests: 'Guests',
    rooms: 'Rooms',
    close: 'Close',
    search: 'Search',
  }
};

const SearchHotelBox = () => {
  const [language, setLanguage] = useState('th');
  const t = translations[language];

  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [rooms, setRooms] = useState(1);
  const [showDropdown, setShowDropdown] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('hotelSearchData'));
    if (saved) {
      setDestination(saved.destination || '');
      setCheckIn(saved.checkIn || '');
      setCheckOut(saved.checkOut || '');
      setGuests(saved.guests || 1);
      setRooms(saved.rooms || 1);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    const data = { destination, checkIn, checkOut, guests, rooms };
    localStorage.setItem('hotelSearchData', JSON.stringify(data));
  }, [destination, checkIn, checkOut, guests, rooms]);

  return (
    <div className="hotel-search-container">
      {/* Language toggle */}
      <div style={{ textAlign: 'right', marginBottom: '10px' }}>
        <button onClick={() => setLanguage(lang => lang === 'th' ? 'en' : 'th')}>
          {language === 'th' ? 'ภาษา ไทย' : 'Language English'}
        </button>
      </div>

      <div className="hotel-search-row">
        <div className="input-box">
          <label>{t.destination}</label>
          <input
            type="text"
            className='search-input'
            placeholder={t.placeholder}
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>

        <div className="input-box">
          <label>{t.checkin}</label>
          <input className='search-input' type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
        </div>

        <div className="input-box">
          <label>{t.checkout}</label>
          <input className='search-input' type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
        </div>

        <div className="input-box" style={{ position: 'relative' }}>
          <label>{t.guestsAndRooms}</label>
          <input
          className='search-input'
            type="text"
            value={`${guests} ${t.guests} & ${rooms} ${t.rooms}`}
            readOnly
            onClick={() => setShowDropdown(!showDropdown)}
          />

          {showDropdown && (
            <div className="dropdown-box">
              <div className="dropdown-row">
                <span>{t.guests}</span>
                <div>
                  <button onClick={() => setGuests(Math.max(1, guests - 1))}>-</button>
                  <span style={{ margin: '0 8px' }}>{guests}</span>
                  <button onClick={() => setGuests(guests + 1)}>+</button>
                </div>
              </div>

              <div className="dropdown-row">
                <span>{t.rooms}</span>
                <div>
                  <button onClick={() => setRooms(Math.max(1, rooms - 1))}>-</button>
                  <span style={{ margin: '0 8px' }}>{rooms}</span>
                  <button onClick={() => setRooms(rooms + 1)}>+</button>
                </div>
              </div>

              <button className="dropdown-close" onClick={() => setShowDropdown(false)}>
                {t.close}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className='flex-end'><button className="search-button-space">{t.search}</button></div>
    </div>
  );
};

export default SearchHotelBox;
