import React, { useEffect } from 'react';
import { ToastContainer } from "react-toastify";
import NavBar from './components/NavBar';
import Routes from './components/Routes';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessages } from '../src/store/messagesReducer';
import { sessionStatus } from '../src/store/usersReducer';
import { fetchUsers } from '../src/store/usersReducer';
import NotFound from './components/NotFond';

function App() {
  const dispatch = useDispatch()
  const status = useSelector(state => state.users.status)

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
