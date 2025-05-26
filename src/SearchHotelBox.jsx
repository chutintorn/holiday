import React, { useState } from 'react';
import './App.css'; // Uses your main app styles

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
    language: 'ภาษา ไทย'
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
    language: 'Language English'
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

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSearch = () => {
    alert(`Searching: ${destination}, ${checkIn} → ${checkOut}, ${guests} guests, ${rooms} rooms`);
  };

  return (
    <div className="hotel-search-container">
      {/* Language toggle */}
      <div style={{ textAlign: 'right', marginBottom: '10px' }}>
        <button onClick={() => setLanguage(lang => lang === 'th' ? 'en' : 'th')}>
          {t.language}
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
          <input
            type="date"
             className='search-input'
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />
        </div>

        <div className="input-box">
          <label>{t.checkout}</label>
          <input
            type="date"
             className='search-input'
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </div>

        <div className="input-box" style={{ position: 'relative' }}>
          <label>{t.guestsAndRooms}</label>
          <input
            type="text"
             className='search-input'
            value={`${guests} ${t.guests} & ${rooms} ${t.rooms}`}
            readOnly
            onClick={toggleDropdown}
          />

          {showDropdown && (
            <div className="dropdown-box">
              <div className="dropdown-row">
                <span>{t.guests}</span>
                <div>
                  <button onClick={() => setGuests(Math.max(1, guests - 1))}>-</button>
                  <span>{guests}</span>
                  <button onClick={() => setGuests(guests + 1)}>+</button>
                </div>
              </div>
              <div className="dropdown-row">
                <span>{t.rooms}</span>
                <div>
                  <button onClick={() => setRooms(Math.max(1, rooms - 1))}>-</button>
                  <span>{rooms}</span>
                  <button onClick={() => setRooms(rooms + 1)}>+</button>
                </div>
              </div>
              <button className="dropdown-close" onClick={toggleDropdown}>{t.close}</button>
            </div>
          )}
        </div>
      </div>
      <div className='flex-end'><button onClick={handleSearch} className="search-button-space">{t.search}</button></div>
    </div>
  );
};

export default SearchHotelBox;
