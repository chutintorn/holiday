import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import { getAvailableFlights } from './api/Booking';
import JourneyTable, { flattenFlights } from './Journey.jsx';

const translations = {
  en: {
    from: 'From',
    to: 'To',
    depart: 'Departure Date',
    return: 'Return Date',
    passenger: 'Select Passengers',
    promo: 'Promo Code (Optional)',
    search: 'Search',
    lang: 'ไทย',
    labels: ['Adult  ', 'Child', 'Infant'],
    ageGroups: ['From 12 years', ' 2–12 years ', 'Up to 2 years']
  },
  th: {
    from: 'ต้นทาง',
    to: 'ปลายทาง',
    depart: 'วันไป',
    return: 'วันกลับ',
    passenger: 'เลือกผู้โดยสาร',
    promo: 'โค้ดส่วนลด (ถ้ามี)',
    search: 'ค้นหา',
    lang: 'English',
    labels: ['ผู้ใหญ่', 'เด็ก', 'ทารก'],
    ageGroups: ['เกิน 12 ปี', 'ตั้งแต่ 2–12 ปี', 'ไม่ถึง 2 ปี']
  }
};

const airportOptions = [
  { label: 'กรุงเทพฯ - ดอนเมือง (DMK)', value: 'DMK' },
  { label: 'กรุงเทพฯ - สุวรรณภูมิ (BKK)', value: 'BKK' },
  { label: 'บอมเบย์ - อินเดีย (ฺBOM)', value: 'BOM' },
  { label: 'เชียงใหม่ (CNX)', value: 'CNX' },
  { label: 'เชียงราย (CEI)', value: 'CEI' },
  { label: 'ภูเก็ต (HKT)', value: 'HKT' },
  { label: 'กระบี่ (KBV)', value: 'KBV' },
  { label: 'สกลนคร (SNO)', value: 'SNO' },
  { label: 'ตรัง (TST)', value: 'TST' }
];

export default function SearchForm() {
  const [lang, setLang] = useState('th');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [adult, setAdult] = useState(1);
  const [child, setChild] = useState(0);
  const [infant, setInfant] = useState(0);
  const [promo, setPromo] = useState('');
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [showPassengerDropdown, setShowPassengerDropdown] = useState(false);

  const dropdownRef = useRef(null);
  const t = translations[lang];

  const handlePassengerChange = (type, delta) => {
    if (type === 'adult') setAdult(prev => Math.max(1, prev + delta));
    if (type === 'child') setChild(prev => Math.max(0, prev + delta));
    if (type === 'infant') setInfant(prev => Math.max(0, prev + delta));
  };

  const totalPassengers = adult + child + infant;
  const passengerLabel = `${adult} ${t.labels[0]}${child ? `, ${child} ${t.labels[1]}` : ''}${infant ? `, ${infant} ${t.labels[2]}` : ''}`;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowPassengerDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getData = async () => {
    if (!origin || !destination || !departDate) {
      alert('✈️ กรุณากรอกต้นทาง ปลายทาง และวันเดินทาง');
      return;
    }
    setLoading(true);
    const journeys = [{ origin, destination, departureDate: departDate }];
    if (returnDate) {
      journeys.push({ origin: destination, destination: origin, departureDate: returnDate });
    }
    const payload = {
      agencyCode: '',
      currency: 'THB',
      adult,
      child,
      infant,
      journeys,
      promoCode: promo.trim() || undefined
    };
    try {
      const response = await getAvailableFlights(payload);
      const tableRows = flattenFlights(response.data);
      setRows(tableRows);
      setSelectedId(null);
      setSelectedFlight(null);
    } catch (err) {
      console.error('❌ API Error:', err);
      alert('API error — please check the console.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitFlight = (row) => {
    alert(`✅ Flight selected: ${row.flightNumber} → ฿${row.fareAmountIncludingTax}`);
  };

  return (
    <div className="search-form">
      <select className="search-input" value={origin} onChange={e => setOrigin(e.target.value)}>
        <option value="">{t.from}</option>
        {airportOptions.map((ap, i) => (
          <option key={i} value={ap.value}>{ap.label}</option>
        ))}
      </select>

      <select className="search-input" value={destination} onChange={e => setDestination(e.target.value)}>
        <option value="">{t.to}</option>
        {airportOptions.map((ap, i) => (
          <option key={i} value={ap.value}>{ap.label}</option>
        ))}
      </select>

      <input type="date" className="search-input" value={departDate} onChange={e => setDepartDate(e.target.value)} />
      <input type="date" className="search-input" value={returnDate} onChange={e => setReturnDate(e.target.value)} />

      <div className="dropdown-container" ref={dropdownRef}>
        <div className="dropdown-toggle search-input" onClick={() => setShowPassengerDropdown(!showPassengerDropdown)}>
          👤 {passengerLabel}
        </div>
        {showPassengerDropdown && (
          <div className="dropdown-panel">
            {[{ label: 'adult', value: adult }, { label: 'child', value: child }, { label: 'infant', value: infant }].map((type, idx) => (
              <div key={type.label} className="passenger-row">
                <div style={{ width: '80px' }}>{t.labels[idx]}</div>
                <button onClick={() => handlePassengerChange(type.label, -1)} disabled={type.label === 'adult' && type.value <= 1}>−</button>
                <span style={{ margin: '0 10px' }}>{type.value}</span>
                <button onClick={() => handlePassengerChange(type.label, 1)}>+</button>
                <div className="age-text" style={{ fontSize: '12px', marginLeft: 10 }}>{t.ageGroups[idx]}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <input type="text" className="search-input" value={promo} onChange={e => setPromo(e.target.value)} placeholder={t.promo} />

      <button type="button" onClick={() => setLang(lang === 'th' ? 'en' : 'th')} style={{ marginBottom: 10 }}>{t.lang}</button>

      <button type="button" className="search-button" onClick={getData} disabled={loading}>{loading ? '…' : t.search}</button>

      <JourneyTable
        rows={rows}
        selectedId={selectedId}
        onSelect={(id, row) => {
          setSelectedId(id);
          setSelectedFlight(row);
        }}
        onSubmit={handleSubmitFlight}
      />

      {selectedFlight && (
        <div style={{ marginTop: '1rem' }}>
          <strong>✈️ Selected:</strong> {selectedFlight.flightNumber} | {selectedFlight.departureTime} → {selectedFlight.arrivalTime} | ฿{selectedFlight.fareAmountIncludingTax.toFixed(2)}
        </div>
      )}
    </div>
  );
}
