import React, { useState } from 'react';
import './Journey.css';

/* --------------------------------------------------
   flattenFlights – converts the airline API response
   into simple table‑friendly rows.
-------------------------------------------------- */
export function flattenFlights(apiData = []) {
  const rows = [];

  apiData.forEach(day => {
    (day.journey || []).forEach(jou => {
      const hhmm = s => (s?.split(' ')[1] || '').slice(0, 5).replace(':', '');
      const dep = hhmm(jou.departureDate);
      const arr = hhmm(jou.arrivalDate);

      const combinedFlightNumber = (jou.travelInfos || [])
        .map(seg => seg.flightNumber)
        .filter(Boolean)
        .join('/');

      const seg = (jou.travelInfos || [])[0] || {};
      const dur = seg.duration || '';
      const ac = (seg.aircraftDescription || '')
        .replace(/\([^)]*\)/g, '')
        .trim();

      (jou.fares || []).forEach(fare => {
        if (fare.productName !== 'NOK LITE') return;

        const otherFareKeys = (jou.fares || [])
          .filter(f => f.fareKey !== fare.fareKey)
          .map(f => f.fareKey);

        const pax = (fare.paxFareTaxBreakdown || [])[0] || {};
        const row = {
          id: `${jou.journeyKey}-${fare.fareKey}`,
          departureTime: dep,
          arrivalTime: arr,
          duration: dur,
          flightNumber: combinedFlightNumber,
          aircraftDescription: ac,
          fareAmountIncludingTax: pax.fareAmountIncludingTax || '',
          fareBasisCode: pax.fareBasisCode || '',
          fareKey: fare.fareKey,
          journeyKey: jou.journeyKey,
          origin: jou.origin || day.origin || '',
          destination: jou.destination || day.destination || '',
          departureDate: jou.departureDate || '' // ✅ Added
        };

        if (otherFareKeys[0]) row.farekey1 = otherFareKeys[0];
        if (otherFareKeys[1]) row.farekey2 = otherFareKeys[1];

        rows.push(row);
      });
    });
  });

  return rows;
}

/* --------------------------------------------------
   JourneyTable – renders the rows in an interactive
   HTML table with radio‑select and NEXT button.
-------------------------------------------------- */
export default function JourneyTable({ rows = [] }) {
  const [selectedId, setSelectedId] = useState(null);
  if (!rows.length) return null;

  const baseCols = [
    'departureTime', 'arrivalTime', 'duration',
    'flightNumber', 'aircraftDescription',
    'fareAmountIncludingTax', 'fareBasisCode',
    'fareKey', 'journeyKey'
  ];

  const extraCols = [];
  if (rows.some(r => r.farekey1)) extraCols.push('farekey1');
  if (rows.some(r => r.farekey2)) extraCols.push('farekey2');
  const cols = [...baseCols, ...extraCols];

  const handleNextClick = () => {
    alert(`Next step for ID: ${selectedId}`);
  };

  const route =
    rows[0]?.origin && rows[0]?.destination
      ? `${rows[0].origin} → ${rows[0].destination}`
      : '';

  // ✅ Format departure date as "05 JUN THU"
  function formatDate(dateStr) {
    if (!dateStr) return '';
    const dateObj = new Date(dateStr);
    if (isNaN(dateObj)) return '';

    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = dateObj.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    const dow = dateObj.toLocaleString('en-US', { weekday: 'short' }).toUpperCase();

    return `${day} ${month} ${dow}`;
  }

  return (
    <div className="journey-table-wrapper">
      {/* Route Header with Small Date */}
      <h2 style={{ textAlign: 'left', margin: '0 0 6px 12px', color: 'blue' }}>
        {route}
        <span style={{ fontSize: '0.85em', marginLeft: '8px', color: '#444' }}>
          {formatDate(rows[0]?.departureDate)}
        </span>
      </h2>

      <table className="journey-table">
        <thead>
          <tr>
            <th></th>
            {cols.map(col => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr
              key={row.id}
              className={row.id === selectedId ? 'selected-row' : ''}
            >
              <td>
                <input
                  type="radio"
                  name="selectFlight"
                  value={row.id}
                  checked={row.id === selectedId}
                  onChange={() => setSelectedId(row.id)}
                />
              </td>

              {cols.map(col => (
                <td
                  key={col}
                  style={
                    col === 'fareAmountIncludingTax'
                      ? { color: 'blue', fontWeight: 'bold', fontSize: '1.05rem' }
                      : col === 'departureTime'
                      ? { color: 'black', fontWeight: 'bold', fontSize: '1.05rem' }
                      : {}
                  }
                >
                  {col === 'fareAmountIncludingTax'
                    ? `THB ${Number(row[col]).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}`
                    : col === 'departureTime' && row[col]?.length === 4
                    ? `${row[col].slice(0, 2)}:${row[col].slice(2)}`
                    : row[col]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {selectedId && (
        <div style={{ marginTop: '16px', textAlign: 'right' }}>
          <button onClick={handleNextClick} className="next-button">
            NEXT
          </button>
        </div>
      )}
    </div>
  );
}
