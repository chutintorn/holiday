// ****** Import required modules ******
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import FlightHotel from './FlightHotel';
import SearchForm from './SearchForm';
import TransferPage from './TransferPage';
import Hotel from './Hotel';
import EventPage from './EventPage';
import ChatPage from './ChatPage';              // ✅ Replaced inline
import PointsPage from './PointsPage';          // ✅ Replaced inline
import InsurancePage from './InsurancePage';    // ✅ Replaced inline
import Header from './Header';
import NavBar from './NavBar';
import './App.css';

// ****** Main homepage content component ******
function HomePage() {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <NavBar active={active} setActive={setActive} />
      <SearchForm />
    </>
  );
}

// ****** Main router entry point for the app ******
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/flighthotel" element={<FlightHotel />} />
        <Route path="/hotels" element={<Hotel />} />
        <Route path="/transfers" element={<TransferPage />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/points" element={<PointsPage />} />
        <Route path="/insurance" element={<InsurancePage />} />
      </Routes>
    </Router>
  );
}
