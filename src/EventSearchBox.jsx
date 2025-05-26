import React, { useState } from 'react';
import './App.css';

const translations = {
  th: {
    title: 'ค้นหาอีเวนต์ตามสถานที่',
    placeholder: 'เลือกเมือง...',
    button: 'ค้นหาอีเวนต์',
    language: 'ภาษาไทย',
    regionTabs: {
      India: 'อินเดีย',
      China: 'จีน',
      Vietnam: 'เวียดนาม',
      Singapore: 'สิงคโปร์',
      Thailand: 'ประเทศไทย'
    }
  },
  en: {
    title: 'Search Events by Location',
    placeholder: 'Select a city...',
    button: 'Search Events',
    language: 'English',
    regionTabs: {
      India: 'India',
      China: 'China',
      Vietnam: 'Vietnam',
      Singapore: 'Singapore',
      Thailand: 'Thailand'
    }
  }
};

// City data per region
const regionData = {
  India: ['BOM (Mumbai)', 'HYD (Hyderabad)'],
  China: ['BJS (Beijing)'],
  Vietnam: ['HAN (Hanoi)'],
  Singapore: ['SIN (Singapore)'],
  Thailand: [
    { en: 'Bangkok', th: 'กรุงเทพฯ' },
    { en: 'Chiang Mai', th: 'เชียงใหม่' },
    { en: 'Chiang Rai', th: 'เชียงราย' },
    { en: 'Chumphon', th: 'ชุมพร' },
    { en: 'Krabi', th: 'กระบี่' },
    { en: 'Mukdahan', th: 'มุกดาหาร' },
    { en: 'Nakhon Si Thammarat', th: 'นครศรีธรรมราช' },
    { en: 'Surat Thani', th: 'สุราษฎร์ธานี' },
    { en: 'Koh Samui', th: 'เกาะสมุย' },
    { en: 'Ubon Ratchathani', th: 'อุบลราชธานี' },
    { en: 'Udon Thani', th: 'อุดรธานี' },
    { en: 'Nakhon Phanom', th: 'นครพนม' },
    { en: 'Phitsanulok', th: 'พิษณุโลก' },
    { en: 'Nan', th: 'น่าน' },
    { en: 'Trang', th: 'ตรัง' },
    { en: 'Pattaya', th: 'พัทยา' },
    { en: 'Chonburi', th: 'ชลบุรี' },
  ]
};

const EventSearchBox = () => {
  const [language, setLanguage] = useState('th');
  const t = translations[language];

  const [selectedRegion, setSelectedRegion] = useState('Thailand');
  const [selectedCity, setSelectedCity] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSelectCity = (city) => {
    setSelectedCity(language === 'th' && city.th ? city.th : city.en || city);
    setShowDropdown(false);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
      {/* Title + Language Toggle */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '12px'
      }}>
        <h2 style={{ fontSize: '20px', margin: 0 }}>{t.title}</h2>
        <button
          onClick={() => setLanguage(lang => lang === 'th' ? 'en' : 'th')}
          style={{
            fontSize: '14px',
            padding: '4px 10px',
            border: '1px solid #ccc',
            borderRadius: '6px',
            cursor: 'pointer',
            background: '#f9f9f9'
          }}
        >
          {t.language}
        </button>
      </div>

      {/* Dropdown Input */}
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          placeholder={t.placeholder}
          value={selectedCity}
          onClick={() => setShowDropdown(!showDropdown)}
          readOnly
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '16px'
          }}
        />
        {showDropdown && (
          <div
            style={{
              position: 'absolute',
              top: '48px',
              left: 0,
              width: '100%',
              background: 'white',
              border: '1px solid #ddd',
              borderRadius: '8px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
              zIndex: 10,
              textAlign: 'left',
              padding: '16px'
            }}
          >
            {/* Region Tabs */}
            <div style={{ display: 'flex', marginBottom: '12px', gap: '8px', flexWrap: 'wrap' }}>
              {Object.keys(regionData).map((region) => (
                <button
                  key={region}
                  onClick={() => setSelectedRegion(region)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    border: '1px solid #ccc',
                    backgroundColor: selectedRegion === region ? '#4adcf6' : '#f3f3f3',
                    fontWeight: selectedRegion === region ? 'bold' : 'normal',
                    cursor: 'pointer'
                  }}
                >
                  {t.regionTabs[region]}
                </button>
              ))}
            </div>

            {/* City List */}
            <div>
              {regionData[selectedRegion].map((city, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSelectCity(city)}
                  style={{
                    padding: '8px 10px',
                    cursor: 'pointer',
                    borderBottom: '1px solid #eee'
                  }}
                >
                  {typeof city === 'string' ? city : (language === 'th' ? city.th : city.en)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Search Button */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button
          onClick={() => alert(`🔍 ${t.button}: ${selectedCity}`)}
          style={{
            padding: '14px 32px',
            fontSize: '18px',
            backgroundColor: '#b5ff00',
            color: '#000',
            border: '2px solid #a0e600',
            borderRadius: '40px',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
            transition: 'background-color 0.3s'
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#d4ff4a')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#b5ff00')}
        >
          🔍 {t.button}
        </button>
      </div>
    </div>
  );
};

export default EventSearchBox;
