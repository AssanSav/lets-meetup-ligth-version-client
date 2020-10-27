import React, { useEffect } from 'react';
import { ToastContainer } from "react-toastify";
import NavBar from './components/NavBar';
import Routes from './components/Routes';
import './App.css';
import { useDispatch } from 'react-redux';
import { fetchMessages } from '../src/store/messagesReducer';
import { sessionStatus } from '../src/store/usersReducer';
import { fetchUsers } from '../src/store/usersReducer';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(sessionStatus())
      dispatch(fetchMessages())
      dispatch(fetchUsers())
  })

  return (
    <>
      <ToastContainer />
      <NavBar />
      <main className="container">
        <Routes />
      </main>
    </>
  );
}

export default App;
