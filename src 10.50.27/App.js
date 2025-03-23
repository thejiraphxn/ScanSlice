import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
// import Register from './Components/Register'
// import Login from './Components/Login'
import Home from './Components/Home'
import axios from 'axios';
import { Helmet } from 'react-helmet'
import { useLocation } from 'react-router-dom';
import NotFound from './Components/NotFound';
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import QRGenerator from './Components/QRGenerator';
import MenuManagement from './Components/MenuManagement'
import SessionStart from './Components/SessionStart';
import UserOrder from './Components/UserOrder';
import ViewAllOrder from './Components/ViewAllOrder';
import Payment from './Components/Payment';
import Finish from './Components/Finish'



export default function App() {
  const [UnSession, setUnSession] = useState(false);
  const [Count, setCount] = useState(0);
  const SessionKey = localStorage.getItem('SessionKey');
  const checkAuth = async () => {
    if (SessionKey != null) {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_SERVER}/SessionAuth/${SessionKey}`, {
          headers: {
            'Ngrok-Skip-Browser-Warning': 'true'
          }
        });
        console.log(response);
        if(response.status == 200){
          console.log(SessionKey);
          if(response.data.Status == false){
              setUnSession(true);
          } 

          if(response.data.Status == true){
            localStorage.setItem('SessionKey', response.data.Results.cis_session_id);
            localStorage.setItem('TableKey', response.data.Results.tb_key);
            localStorage.setItem('TableNumber', response.data.Results.tb_name);
            setUnSession(false);
          } 
          setCount(Count + 1);
        } 
      } catch (err) {
        console.error('Error checking session', err);
        setUnSession(true);
      }
    } else {
      setUnSession(true);
    }


  };



  useEffect(() => {
    checkAuth();


  }, []);

  


  const CurrentLocation = useLocation().pathname;
  let TitleLabel = 'Pizza-Ordering App';

  if (CurrentLocation == '/Home' || CurrentLocation == '/') {
    TitleLabel = 'หน้าแรก | '+TitleLabel;
  } 
  
  

  return (
    <>
      <Helmet>
        <title>
          {TitleLabel}
        </title>
      </Helmet>

      <Routes>
        <Route path="/" element={<Navigate to={'/Home'}/>} />
        <Route path="/Home" element={<Home />} />
        <Route path="/QRGenerator" element={<QRGenerator />} />
        <Route path="/MenuManagement" element={<MenuManagement/>} />
        <Route path="/SessionStart/:SessionID" element={<SessionStart/>} />
        <Route path="/UserOrder/:SessionID" element={<UserOrder/>} />
        <Route path="/ViewAllOrder" element={<ViewAllOrder/>} />
        <Route path="/Payment" element={<Payment/>} />
        <Route path='/NotFound' exact={true} element={<NotFound/>} />
        <Route path='*' exact={true} element={<NotFound/>} />
      </Routes>
        

    </>
  )
}
