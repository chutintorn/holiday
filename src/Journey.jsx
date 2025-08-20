// Journey.jsx
import React, { useState } from 'react';
import './Journey.css';

const CLIENT_ID = '887eb5c3d01e4cf192404b731ee2eb27';
const CLIENT_SECRET = 'A3B4033E52bE44C5B84c6869b4bd4Bd1';

export function flattenFlights(apiData = [],securityToken) {
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
      const ac = (seg.aircraftDescription || '').replace(/\([^)]*\)/g, '').trim();

      const xtraFare = (jou.fares || []).find(f => f.productName === 'NOK XTRA');
      const xtraAmt = (xtraFare?.paxFareTaxBreakdown?.[0]?.fareAmountIncludingTax) || '';

      const maxFare = (jou.fares || []).find(f => f.productName === 'NOK MAX');
      const maxAmt = (maxFare?.paxFareTaxBreakdown?.[0]?.fareAmountIncludingTax) || '';

      (jou.fares || []).forEach(fare => {
        if (fare.productName !== 'NOK LITE') return;

        const otherFareKeys = (jou.fares || [])
          .filter(f => f.fareKey !== fare.fareKey)
          .map(f => f.fareKey);

        const pax = (fare.paxFareTaxBreakdown || [])[0] || {};

        rows.push({
          id: `${jou.journeyKey}-${fare.fareKey}`,
          departureTime: dep,
          arrivalTime: arr,
          duration: dur,
          flightNumber: combinedFlightNumber,
          aircraftDescription: ac,
          fareAmountIncludingTax: pax.fareAmountIncludingTax || '',
          nokXtraAmount: xtraAmt,
          nokMaxAmount: maxAmt,
          fareBasisCode: pax.fareBasisCode || '',
          fareKey: fare.fareKey,
          journeyKey: jou.journeyKey,
          origin: jou.origin || day.origin || '',
          destination: jou.destination || day.destination || '',
          departureDate: jou.departureDate || '',
          farekey1: otherFareKeys[0] || '',
          farekey2: otherFareKeys[1] || '',
          securityToken: securityToken || `token-${jou.journeyKey}`,
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET
        });
      });
    });
  });

  return rows;
}

export default function JourneyTable({ rows = [], onSubmit }) {
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedFare, setSelectedFare] = useState(null);
  if (!rows.length) return null;

  const handleFareClick = (row, col) => {
    let fareKey;
    if (col === 'fareAmountIncludingTax') fareKey = row.fareKey;
    else if (col === 'nokXtraAmount') fareKey = row.farekey1;
    else if (col === 'nokMaxAmount') fareKey = row.farekey2;
    if (!fareKey) return;

    setSelectedRow(row);
    setSelectedFare({
      journeyKey: row.journeyKey,
      fareKey,
      securityToken: row.securityToken,
      client_id: row.client_id,
      client_secret: row.client_secret
    });
  };

  const handleNextClick = () => {
    if (!selectedFare || !onSubmit) return;
    onSubmit(selectedRow, selectedFare);
  };

  const colLabel = col => {
    if (col === 'fareAmountIncludingTax') return 'Nok Lite';
    if (col === 'nokXtraAmount') return 'Nok X-TRA';
    if (col === 'nokMaxAmount') return 'Nok MAX';
    if (col === 'departureTime') return 'Departure';
    if (col === 'arrivalTime') return 'Arrival';
    if (col === 'flightNumber') return 'Flight';
    if (col === 'aircraftDescription') return 'Aircraft';
    return col;
  };

  const cols = [
    'departureTime', 'arrivalTime', 'duration',
    'flightNumber', 'aircraftDescription',
    'fareAmountIncludingTax', 'nokXtraAmount', 'nokMaxAmount'
  ];

  const depDateStr = (() => {
    const date = new Date(rows[0]?.departureDate);
    const ddMMM = date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }).toUpperCase();
    const dow = date.toLocaleDateString('en-GB', { weekday: 'short' });
    const dowColors = {
      Mon: '#FFD700', Tue: '#FF69B4', Wed: '#32CD32',
      Thu: '#FFA500', Fri: '#00BFFF', Sat: '#CF9FFF', Sun: '#FF4500'
    };
    return (
      <>
        <span style={{ fontSize: '0.85em', marginLeft: 8, color: '#444' }}>{ddMMM}</span>
        <span style={{
          fontSize: '0.85em', marginLeft: 6, backgroundColor: '#000',
          color: dowColors[dow] || '#FFF', padding: '2px 6px', borderRadius: 4,
          fontWeight: 600, display: 'inline-block'
        }}>{dow}</span>
      </>
    );
  })();

  return (
    <div className="journey-table-wrapper">
      <h2 style={{ textAlign: 'left', margin: '0 0 6px 12px', color: 'blue' }}>
        {rows[0]?.origin} → {rows[0]?.destination} {depDateStr}
      </h2>

      <table className="journey-table">
        <thead>
          <tr>
            {cols.map(col => <th key={col}>{colLabel(col)}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr key={row.id}>
              {cols.map(col => {
                const isSelectable = ['fareAmountIncludingTax', 'nokXtraAmount', 'nokMaxAmount'].includes(col);
                const isSelected = selectedRow?.id === row.id &&
                  selectedFare?.fareKey === (
                    col === 'fareAmountIncludingTax' ? row.fareKey :
                    col === 'nokXtraAmount' ? row.farekey1 :
                    row.farekey2
                  );
                return (
                  <td
                    key={col}
                    onClick={() => isSelectable && handleFareClick(row, col)}
                    style={{
                      cursor: isSelectable ? 'pointer' : 'default',
                      backgroundColor: isSelected ? 'yellow' : 'transparent',
                      fontWeight: isSelectable ? 'bold' : 'normal'
                    }}>
                    {isSelectable && row[col] !== ''
                      ? `THB ${Number(row[col]).toLocaleString(undefined, {
                          minimumFractionDigits: 2, maximumFractionDigits: 2
                        })}`
                      : row[col]}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: 16, textAlign: 'right' }}>
        <button onClick={handleNextClick} className="next-button">NEXT</button>
      </div>
    </div>
  );
}
