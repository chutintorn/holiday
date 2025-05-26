import React, { useState } from 'react';
import './App.css';
import { getAvailableFlights } from './api/Booking';
import JourneyTable, { flattenFlights } from './Journey.jsx';

const translations = {
  en: {
    from: 'From',
    to: 'To',
    depart: 'Departure Date',
    return: 'Return Date',
    passenger: 'Select Passenger',
    promo: 'Promo Code (Optional)',
    search: 'Search',
    lang: 'ไทย',
    passengers: ['1 Passenger', '2 Passengers', '3 Passengers', '4 Passengers']
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
    passengers: ['1 ผู้โดยสาร', '2 ผู้โดยสาร', '3 ผู้โดยสาร', '4 ผู้โดยสาร']
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
  const [passengers, setPassengers] = useState(1);
  const [promo, setPromo] = useState('');
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);

  const [selectedId, setSelectedId] = useState(null);
  const [selectedFlight, setSelectedFlight] = useState(null);

  const t = translations[lang];

  const getData = async () => {
    if (!origin || !destination || !departDate) {
      alert('✈️ กรุณากรอกต้นทาง ปลายทาง และวันเดินทาง');
      return;
    }

    setLoading(true);

    const journeys = [{ origin, destination, departureDate: departDate }];

    if (returnDate) {
      journeys.push({
        origin: destination,
        destination: origin,
        departureDate: returnDate
      });
    }

    const payload = {
      agencyCode: 'OTAINMMT',
      currency: 'THB',
      adult: passengers,
      child: 0,
      infant: 0,
      journeys,
      promoCode: promo.trim() || undefined
    };

    try {
      const response = await getAvailableFlights(payload);
      const tableRows = flattenFlights(response.data);
      console.log("feat",response);
      console.log("fix",tableRows);
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
    // TODO: navigate, store, or post to API as needed
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

      <select className="search-input" value={passengers} onChange={e => setPassengers(Number(e.target.value))}>
        <option value="">{t.passenger}</option>
        {t.passengers.map((label, i) => (
          <option key={i} value={i + 1}>{label}</option>
        ))}
      </select>

      <input
        type="text"
        className="search-input"
        value={promo}
        onChange={e => setPromo(e.target.value)}
        placeholder={t.promo}
      />

      <button type="button" onClick={() => setLang(lang === 'th' ? 'en' : 'th')} style={{ marginBottom: 10 }}>
        {t.lang}
      </button>

      <button type="button" className="search-button" onClick={getData} disabled={loading}>
        {loading ? '…' : t.search}
      </button>

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
