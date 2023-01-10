import React from 'react';

import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import MainPage from './components/MainPage/MainPage';
import NavBar from './components/NavBar';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import AllEvents from './components/AllEvents/AllEvents';
import ArchivePage from './components/ArchivePage/ArchivePage';
import LKabinet from './components/LKabinet/LKabinet';
import UserPage from './components/UserPage/UserPage';
import CreateEvent from './components/CreateEvent/CreateEvent';
import EventPage from './components/EventPage/EventPage';
import Ankets from './components/Ankets/Ankets';
import AboutUs from './components/AboutUs/AboutUs';
import './index.css';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/allEvents" element={<AllEvents />} />
        <Route path="/archiveEvents" element={<ArchivePage />} />
        <Route path="/lk" element={<LKabinet />} />
        <Route path="/user/:id" element={<UserPage />} />
        <Route path="/newEvent" element={<CreateEvent />} />
        <Route path="/event/:id" element={<EventPage />} />
        <Route path="/adminAnkets" element={<Ankets />} />
      </Routes>
      <Footer />
    </>
  );
}
export default App;
