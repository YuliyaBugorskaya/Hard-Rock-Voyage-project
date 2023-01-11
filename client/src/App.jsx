import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Footer from './components/Footer';
import MainPage from './components/MainPage/MainPage';
import NavBar from './components/NavBar';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import AllEvents from './components/AllEvents/AllEvents';
import ArchivePage from './components/ArchivePage/ArchivePage';
import LKabinet from './components/LKabinet/LKabinet';
// import UserPage from './components/UserPage/UserPage';
import CreateEvent from './components/CreateEvent/CreateEvent';
import EventPage from './components/EventPage/EventPage';
import Ankets from './components/Ankets/Ankets';
import Page404 from './components/404/Page404';
import './index.css'; // для удаления margin в body добавляю этот файл стилей, в котором устанавливаю margin: 0 для body

// const socket = new WebSocket('ws://localhost:3001');
function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  // console.log(socket);

  useEffect(() => {
    if (user.id) {
      dispatch({ type: 'SOCKET_INIT' });
    }
  }, [user]);
  return (
    <>
      <NavBar />
      <Routes>

        <Route path="/" element={<MainPage />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/allEvents" element={<AllEvents />} />
        <Route path="/archiveEvents" element={<ArchivePage />} />
        <Route path="/lk" element={<LKabinet />} />
        {/* <Route path="/user/:id" element={<UserPage />} /> */}
        <Route path="/newEvent" element={<CreateEvent />} />
        <Route path="/event/:id" element={<EventPage />} />
        <Route path="/adminAnkets" element={<Ankets />} />
        <Route path="*" element={<Page404 />} />

      </Routes>
      <Footer />
    </>
  );
}
export default App;
