// src/pages/ViewPriceDetail.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { saveAs } from 'file-saver';

const translations = {
  th: {
    title: 'รายละเอียดราคา',
    baseFare: 'ค่าโดยสารพื้นฐาน',
    tax: 'ภาษี',
    total: 'ราคารวม',
    back: 'ย้อนกลับ',
    exportPDF: 'บันทึกเป็น PDF',
    bookNow: 'จองตอนนี้'
  },
  en: {
    title: 'Price Details',
    baseFare: 'Base Fare',
    tax: 'Tax',
    total: 'Total Price',
    back: 'Back',
    exportPDF: 'Export PDF',
    bookNow: 'Book Now'
  }
};

export default function ViewPriceDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { priceDetail, lang } = location.state || {};
  const t = translations[lang || 'en'];

  if (!priceDetail) return <p>⛔ No price detail available.</p>;

  const { baseFareAmount, taxAmount, totalAmount } = priceDetail;

  const handleExportPDF = () => {
    const content = `
${t.title}
--------------------------
${t.baseFare}: ${baseFareAmount} THB
${t.tax}: ${taxAmount} THB
${t.total}: ${totalAmount} THB
`;

    const blob = new Blob([content], { type: 'application/pdf' });
    saveAs(blob, 'PriceDetail.pdf');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>{t.title}</h2>
      <p>
        {t.baseFare}: <strong>{baseFareAmount} THB</strong>
      </p>
      <p>
        {t.tax}: <strong>{taxAmount} THB</strong>
      </p>
      <p>
        {t.total}: <strong>{totalAmount} THB</strong>
      </p>

      <div style={{ marginTop: '20px' }}>
        <button onClick={() => navigate(-1)}>{t.back}</button>{' '}
        <button onClick={handleExportPDF}>{t.exportPDF}</button>{' '}
        <button onClick={() => alert('🚧 Booking feature coming soon!')}>{t.bookNow}</button>
      </div>
    </div>
  );
}
