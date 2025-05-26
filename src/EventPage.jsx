import React, { useRef } from 'react';
import Header from './Header';
import NavBar from './NavBar';
import EventSearchBox from './EventSearchBox';
import './App.css';

const imageList = [
  { src: "https://img.wongnai.com/p/1920x0/2024/09/18/9a18f8aabaca4a56819ec0125cfadb62.jpg", alt: "Wat Pa Phu Kon" },
  { src: "https://tse1.mm.bing.net/th?id=OIP.jUf5bDcYAE23Z_YfEp5_sAHaFm&cb=iwc1&pid=Api", alt: "Wat Kham Chanot" },
  { src: "https://tse4.mm.bing.net/th?id=OIP.nZLv0dBmEiBDhDEUvxthvwHaFj&pid=Api", alt: "Wat Phothisomphon" },
  { src: "https://tse2.mm.bing.net/th?id=OIP.xrORzA1Q7yUxElKde7Ht4wHaFj&pid=Api", alt: "Wat Pa Ban Tat" },
  { src: "https://s359.kapook.com/rf/320/176/pagebuilder/98fd1f78-e2e5-4575-80de-9ab12cb36b74.jpg", alt: "Repeat 1" },
  { src: "https://cms.kapook.com/uploads/tag/4/ID_3356_57232249d7f28.jpg", alt: "Repeat 2" },
  { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR989zX-jD1zBRPegwo--I3SHLylDGQUGzdrA&s", alt: "Repeat 3" },
  { src: "https://mpics.mgronline.com/pics/Images/562000005781216.JPEG", alt: "Repeat 4" },
  { src: "https://roijang.com/wp-content/uploads/2022/04/shutterstock_1406012123.jpg", alt: "Repeat 5" }
];

const EventPage = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const scrollAmount = 300;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <Header />
      <NavBar active={4} setActive={() => {}} />

      <div className="event-carousel-wrapper">
        <button className="scroll-button left" onClick={() => scroll('left')}>◀</button>

        <div className="event-carousel" ref={scrollRef}>
          <div className="event-track">
            {imageList.map((img, index) => (
              <img key={index} src={img.src} alt={img.alt} />
            ))}
          </div>
        </div>

        <button className="scroll-button right" onClick={() => scroll('right')}>▶</button>
      </div>

      <div style={{ margin: '0 auto', maxWidth: '800px', padding: '0 20px 40px' }}>
        <EventSearchBox />
      </div>
    </>
  );
};

export default EventPage;
