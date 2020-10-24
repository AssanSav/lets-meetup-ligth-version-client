import React from 'react';
import { ToastContainer } from "react-toastify";
import NavBar from './components/NavBar';
import Routes from './components/Routes';
import './App.css';

function App() {
  return (
    <>
    <ToastContainer/>
    <NavBar />
    <main className="container">
      <Routes />
    </main>
    </>
  );
}

export default App;
