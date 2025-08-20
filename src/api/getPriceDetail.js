// src/api/getPriceDetail.js
export async function getPriceDetail(row) {
  const response = await fetch('http://localhost:3100/pricedetails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'securityToken': row.securityToken
    },
    body: JSON.stringify([{ fareKey: row.fareKey, journeyKey: row.journeyKey }])
  });

  if (!response.ok) throw new Error('Failed to fetch price detail');
  return response.json();
}
